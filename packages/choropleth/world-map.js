import * as d3 from "d3";

import { readFileSync, writeFileSync } from "fs";

import { createCanvas } from "canvas";
import { drawDiagonalPattern } from "./create-map.js";

const fc = JSON.parse(readFileSync("world-110m.geojson", "utf-8"));
const countries = { type: "FeatureCollection", features: fc.features.filter(f => f.id !== "ATA") };

async function fetchWorldBankData(indicator) {
  const url = `https://api.worldbank.org/v2/country/all/indicator/${indicator}?format=json&per_page=20000`;

  const res = await fetch(url);
  const json = await res.json();
  if (!json || json.length < 2) {
    throw new Error("Unexpected World Bank API response format");
  }
  const data = json[1]
    .filter(d => d.value !== null && d.countryiso3code)
    .sort((a, b) => b.date - a.date);

  // Get most recent year with substantial coverage
  const latestYear = data[0].date;

  const filtered = data.filter(d => d.date === latestYear);

  const map = new Map();
  filtered.forEach(d => {
    map.set(d.countryiso3code, +d.value);
  });

  /*returns [
{
"page": 1,
"pages": 8778,
"per_page": 2,
"total": 17556,
"sourceid": "2",
"lastupdated": "2026-02-24"
},
[
{
"indicator": {
"id": "SP.DYN.TFRT.IN",
"value": "Fertility rate, total (births per woman)"
},
"country": {
"id": "ZH",
"value": "Africa Eastern and Southern"
},
"countryiso3code": "AFE",
"date": "2023",
"value": 4.22382000342151,
"unit": "",
"obs_status": "",
"decimal": 1
},,*/

  return { dataMap: map, year: latestYear };
}

function getColorScale(values, colorScheme = "Greys") {
  // Use log scale for better color distribution with large value ranges
  const min = d3.min(values) || 0;
  const max = d3.max(values) || 1;

  // Use linear scale if min is <= 0 (log scale doesn't work with non-positive values)
  const useLogScale = min > 0;

  const scale = useLogScale
    ? d3.scaleLog().domain([min, max]).range([0, 1]).clamp(true)
    : d3.scaleLinear().domain([min, max]).range([0, 1]).clamp(true);

  const colorScale = d3.scaleSequential()
    .domain([0, 1])
    .interpolator(d3[`interpolate${colorScheme}`] || d3.interpolateBlues);

  return {
    scale: (value) => {
      const normalized = scale(value);
      return colorScale(normalized);
    },
    min,
    max
  };
}

async function createWorldMap({ width = 800, height = 480, showLegend = true, indicator = "SP.DYN.TFRT.IN" }) {
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  // Map and projection
  const projection = d3.geoNaturalEarth1()
    .scale(width / 1.5 / Math.PI)
    .translate([width / 2, height / 1.7]);
  const path = d3.geoPath()
    .projection(projection)
    .context(context);

  // Load external data
  const geo = countries; // Already loaded from file
  const { dataMap, year } = await fetchWorldBankData(indicator);

  // Create color scale from actual data values
  const values = Array.from(dataMap.values());
  const { scale: colorScale, min, max } = getColorScale(values, "Greys");

  let nullCount = 0;

  // Draw the map
  geo.features.forEach(feature => {
    const value = dataMap.get(feature.id);
    context.strokeStyle = "#ccc";
    context.lineWidth = 0.5;
    context.beginPath();
    path(feature);

    if (value !== undefined) {
      const color = colorScale(value);
      context.fillStyle = color;
      context.fill();
      context.stroke();
    } else {
      nullCount++;
      if (nullCount >= geo.features.length / 3) {
        throw new Error("Too much missing data for this indicator, cannot generate meaningful map");
      }
      // Use diagonal pattern for missing data
      drawDiagonalPattern(context, feature, path, width, height);
      context.stroke();
    }
  });

  // Draw legend
  if (showLegend) {
    const legendX = 20;
    const legendY = height - 35;
    const legendWidth = 120;
    const legendHeight = 15;
    const numSteps = 100;

    // Draw continuous color ramp
    for (let i = 0; i < numSteps; i++) {
      const value = min + (max - min) * (i / numSteps);
      const x = legendX + (i / numSteps) * legendWidth;
      context.fillStyle = colorScale(value);
      context.fillRect(x, legendY, legendWidth / numSteps + 1, legendHeight);
    }

    // Draw labels below
    context.fillStyle = "#333";
    context.font = "9px Arial";
    context.fillText(min.toFixed(1), legendX - 2, legendY + legendHeight + 10);
    context.fillText(max.toFixed(1), legendX + legendWidth - 10, legendY + legendHeight + 10);
  }

  return {
    img_buffer: canvas.toBuffer("image/png"),
    year,
    indicator
  };
}

export { createWorldMap };