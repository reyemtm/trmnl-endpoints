//https://observablehq.com/@d3/choropleth/2

import * as d3 from 'd3';
import * as ss from 'simple-statistics';
import * as topojson from 'topojson-client';

import { createCanvas } from 'canvas';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { getCountyRelativeStatFromCensusReporter } from './get-data.js';
import path from 'path';

/**
 * Generate a choropleth map with automatic data binning
 *
 * @param {Object} options - Configuration options
 * @param {Array} options.data - Array of data objects with id and value: [{id: 'state-name', value: 123}, ...]
 * @param {Object} options.topology - TopoJSON topology (e.g., US states, counties)
 * @param {string} options.topologyObjectKey - Key in topology.objects to use (e.g., 'states', 'counties')
 * @param {string} options.idField - Field in topology features to match with data ids (default: 'name')
 * @param {string} options.binMethod - Binning method: 'jenks', 'quantile', 'equal', or 'percentile' (default: 'jenks')
 * @param {number} options.numBins - Number of bins/classes (default: 10)
 * @param {string} options.color - Color scheme: 'grayscale', 'blue', 'red', 'green', 'purple' (default: 'grayscale')
 * @param {number} options.width - Canvas width (default: 800)
 * @param {number} options.height - Canvas height (default: 480)
 * @param {string} options.title - Map title
 * @param {string} options.legendTitle - Legend title
 * @param {Function} options.formatValue - Function to format values in legend (default: d => d.toFixed(0))
 * @returns {Canvas} Canvas object with rendered choropleth map
 */
export function createChoropleth(options) {
  const {
    data,
    topology,
    topologyObjectKey,
    idField = 'name',
    binMethod = 'jenks',
    numBins = 10,
    color = 'grayscale',
    width = 800,
    height = 480,
    title = '',
    legendTitle = 'Value',
    formatValue = (d) => d.toFixed(0),
    projection = null, // Optional custom projection
  } = options;

  // Map color names to D3 color schemes
  const colorSchemeMap = {
    'grayscale': d3.schemeGreys[9],
    'blue': d3.schemeBlues[9],
    'red': d3.schemeReds[9],
    'green': d3.schemeGreens[9],
    'purple': d3.schemePurples[9],
    'orange': d3.schemeOranges[9]
  };

  const colorScheme = colorSchemeMap[color.toLowerCase()] || d3.schemeGreys[9];

  // Create canvas context for D3
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  // Create data map
  const dataMap = new Map(data.map(d => [d.id, d.value]));
  const values = data.map(d => d.value).filter(v => v != null && !isNaN(v));

  // Bin the data
  const { breaks, colorScale } = binData(values, binMethod, numBins, colorScheme);

  // Setup GeoJSON from topology
  const geojson = topojson.feature(topology, topology.objects[topologyObjectKey]);

  // Setup projection with padding for legend below
  const mapHeight = height - 50; // Leave 50px at bottom for legend
  const proj = projection || d3.geoAlbersUsa().fitSize([width, mapHeight], geojson);
  const path = d3.geoPath(proj, context);

  // Draw background
  context.fillStyle = '#fff';
  context.fillRect(0, 0, width, height);

  // Add title if provided
  if (title) {
    context.fillStyle = '#000';
    context.font = 'normal 22px "Noto Sans", sans-serif';
    context.textAlign = 'center';
    // context.fillText(title.toUpperCase(), width / 2, 30);
  }

  // Draw map
  geojson.features.forEach(feature => {
    // Handle both top-level 'id' field and properties
    const id = idField === 'id' ? feature.id : feature.properties[idField];
    const value = dataMap.get(String(id));

    context.beginPath();
    path(feature);

    if (value != null) {
      // Data available: fill with color
      context.fillStyle = colorScale(value);
      context.fill();
    } else {
      // No data: draw diagonal lines pattern
      drawDiagonalPattern(context, feature, path, width, height);
    }

    context.strokeStyle = 'lightgray';
    context.lineWidth = 0.25;
    context.stroke();
  });

  // Add legend
  drawLegend(context, breaks, colorScale, legendTitle, formatValue, width, height);

  return canvas;
}

/**
 * Draw diagonal line pattern for no-data regions
 */
export function drawDiagonalPattern(context, feature, path, canvasWidth, canvasHeight) {
  // Get bounding box of feature
  const bounds = path.bounds(feature);
  if (!bounds || bounds.length < 2) return;

  const [[x0, y0], [x1, y1]] = bounds;
  const width = x1 - x0;
  const height = y1 - y0;

  // Save current state
  context.save();

  // Create pattern with diagonal lines
  const patternCanvas = createCanvas(8, 8);
  const patternCtx = patternCanvas.getContext('2d');

  // Light gray background
  patternCtx.fillStyle = '#e8e8e8';
  patternCtx.fillRect(0, 0, 8, 8);

  // Diagonal lines
  patternCtx.strokeStyle = '#999';
  patternCtx.lineWidth = 1.2;
  patternCtx.beginPath();
  patternCtx.moveTo(-2, 2);
  patternCtx.lineTo(6, 10);
  patternCtx.stroke();

  patternCtx.beginPath();
  patternCtx.moveTo(6, -2);
  patternCtx.lineTo(14, 6);
  patternCtx.stroke();

  // Fill with pattern
  const pattern = context.createPattern(patternCanvas, 'repeat');
  context.fillStyle = pattern;
  context.fill();

  context.restore();
}

/**
 * Bin data using specified method
 */
function binData(values, method, numBins, colorScheme) {
  let breaks;

  switch (method) {
    case 'jenks':
      // Jenks natural breaks optimization
      breaks = ss.ckmeans(values, Math.min(numBins, values.length));
      // Convert clusters to break points
      const jenksBreaks = breaks.map(cluster => Math.min(...cluster));
      jenksBreaks.push(Math.max(...values));
      breaks = [...new Set(jenksBreaks)].sort((a, b) => a - b);
      break;

    case 'quantile':
      // Equal count in each bin
      const quantiles = d3.range(numBins + 1).map(i => d3.quantile(values.sort(d3.ascending), i / numBins));
      breaks = [...new Set(quantiles)];
      break;

    case 'equal':
      // Equal interval
      const min = Math.min(...values);
      const max = Math.max(...values);
      const interval = (max - min) / numBins;
      breaks = d3.range(numBins + 1).map(i => min + i * interval);
      break;

    case 'percentile':
      // Specific percentiles
      const percentiles = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
      breaks = percentiles.map(p => d3.quantile(values.sort(d3.ascending), p / 100));
      breaks = [...new Set(breaks)];
      break;

    default:
      throw new Error(`Unknown binning method: ${method}`);
  }

  // Create color scale
  const colorScale = d3.scaleThreshold()
    .domain(breaks.slice(1, -1)) // Exclude first and last
    .range(colorScheme);

  return { breaks, colorScale };
}

/**
 * Draw horizontal legend on canvas (D3 color-legend style)
 */
function drawLegend(context, breaks, colorScale, title, formatValue, width, height) {
  const barHeight = 12;
  const barWidth = 300;
  const tickHeight = 4;
  const bottomMargin = 35;
  const rightMargin = 20;
  const titleFont = 'normal 11px "Noto Sans", sans-serif';
  const labelFont = 'normal 10px "Noto Sans", sans-serif';
  const titleToBarPadding = 6; // Tight spacing between title and bar

  // Positions
  const barX = width - barWidth - rightMargin;
  const barY = height - bottomMargin;
  const titleY = barY - titleToBarPadding - 2; // Position title above bar with minimal gap
  const ticksY = barY + barHeight + 2;

  // Draw title
  context.fillStyle = '#000';
  context.font = titleFont;
  context.textAlign = 'left';
  context.fillText(title.toUpperCase(), barX, titleY);

  // Draw color bar
  const numColors = breaks.length - 1;
  const colorBoxWidth = barWidth / numColors;

  for (let i = 0; i < numColors; i++) {
    const midValue = (breaks[i] + breaks[i + 1]) / 2;
    const color = colorScale(midValue);

    context.fillStyle = color;
    context.fillRect(barX + i * colorBoxWidth, barY, colorBoxWidth, barHeight);

    // Draw tick mark
    context.strokeStyle = '#333';
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(barX + i * colorBoxWidth, barY + barHeight);
    context.lineTo(barX + i * colorBoxWidth, barY + barHeight + tickHeight);
    context.stroke();
  }

  // Last tick mark
  context.strokeStyle = '#333';
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(barX + barWidth, barY + barHeight);
  context.lineTo(barX + barWidth, barY + barHeight + tickHeight);
  context.stroke();

  // Draw labels
  context.fillStyle = '#666';
  context.font = labelFont;
  context.textAlign = 'center';

  for (let i = 0; i < breaks.length; i++) {
    const labelX = barX + (i / numColors) * barWidth;
    const labelY = ticksY + 11;
    context.fillText(formatValue(breaks[i]), labelX, labelY);
  }
}

/**
 * Orchestrate full pipeline: fetch data → create map → save to temp
 *
 * @param {Object} options - Configuration for the choropleth
 * @param {string} options.table - ACS table ID
 * @param {string|string[]} options.numerator - Numerator variable(s)
 * @param {string} options.denominator - Denominator variable
 * @param {string} [options.title] - Map title
 * @param {string} [options.color='grayscale'] - Color scheme: 'grayscale', 'blue', 'red', 'green', 'purple'
 * @param {number} [options.width] - Canvas width
 * @param {number} [options.height] - Canvas height
 * @param {string} [options.outputDir] - Optional output directory for PNG (default: temp folder in current directory)
 * @returns {Promise<string>} Path to saved PNG file
 */
export async function generateCountyChoroplethMap(options = {}) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const tempDir = options?.outputDir || path.join(__dirname, 'temp');

  // Check for required fonts on the system
  // On Ubuntu: apt install fonts-roboto fonts-noto

  // Clear temp folder
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tempDir, { recursive: true });

  // Fetch county data
  const countyData = await getCountyRelativeStatFromCensusReporter(options);

  // Fetch US county topology
  const topoRes = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json');
  const topology = await topoRes.json();

  // Create data map keyed by FIPS code for topology matching
  const dataByFips = new Map(countyData.map(d => [d.fips, d]));
  const data = countyData.map(d => ({
    id: d.fips, // Use FIPS code as ID
    value: d.percent,
    fips: d.fips
  }));

  // Create choropleth
  const canvas = createChoropleth({
    data,
    topology,
    topologyObjectKey: 'counties',
    idField: 'id', // County FIPS code in topology
    color: options.color || 'grayscale',
    title: options.title || 'US County Choropleth',
    legendTitle: options._legendName ? `${options._legendName} (%)` : `${options.table} Ratio (%)`,
    formatValue: (d) => d.toFixed(1),
    width: options.width || 800,
    height: options.height || 480
  });

  // Save PNG
  const title = options.title ? options.title.replace(/\s+/g, '-').toLowerCase() : 'choropleth';
  const outputPath = path.join(tempDir, `us-${title}.png`);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);

  console.log(`  Map saved to: ${outputPath}`);
  return outputPath;
}

/**
 * Simplified interface to generate a county choropleth by field
 *
 * @param {Object} options
 * @param {string} options.field - ACS field ID (e.g., "B17001002")
 * @param {string} options.name - Display name for the metric (e.g., "Poverty Rate")
 * @param {string} [options.color='grayscale'] - Color scheme: 'grayscale', 'blue', 'red', 'green', 'purple'
 * @param {number} [options.width] - Canvas width (default: 800)
 * @param {number} [options.height] - Canvas height (default: 480)
 * @param {string} [options.outputDir] - Optional output directory for PNG (default: temp folder in current directory)
 * @returns {Promise<string>} Path to saved PNG file
 */
export async function generateUSCountyMap({ field, name, color = 'grayscale', width = 800, height = 480, outputDir = "temp" }) {
  // Extract table from field (e.g., "B17001002" -> "B17001")
  const table = field.replace(/\d{3}$/, '');

  // Auto-detect denominator: replace last 3 digits with "001" (total)
  const denominator = table + '001';

  return generateCountyChoroplethMap({
    table,
    numerator: field,
    denominator,
    title: `${name} by US County`,
    color,
    width,
    height,
    // Override legendTitle in the call (we'll need to pass this through)
    _legendName: name,
    outputDir
  });
}