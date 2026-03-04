import { generateCountyChoroplethMap, generateCountyMap } from './create-map.js';

import assert from 'assert';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { getCountyRelativeStatFromCensusReporter } from './get-data.js';
import path from 'path';

const checkmark = "\x1b[32m✓\x1b[0m";

function isRateLimitError(error) {
  const message = String(error?.message || error || '').toLowerCase();
  return message.includes('429') || message.includes('too many requests') || message.includes('rate limit');
}

async function runTests() {
  console.log('Testing @endpoints/choropleth getCountyRelativeStatFromCensusReporter...\n');

  try {
    const results = await getCountyRelativeStatFromCensusReporter({
      table: 'B17001',
      numerator: 'B17001002', // Income below poverty (Census Reporter format)
      denominator: 'B17001001' // Total (Census Reporter format)
    });

    console.log(`${checkmark} getCountyRelativeStatFromCensusReporter executed successfully`);

    assert(Array.isArray(results), 'Should return an array');
    assert(results.length > 0, 'Should return at least one county');

    const sample = results[0];
    assert(sample.name, 'Should include a county name');
    assert(/^[0-9]{5}$/.test(sample.fips), 'Should include a 5-digit FIPS');
    assert(Number.isFinite(sample.numerator), 'Should include a numeric numerator');
    assert(Number.isFinite(sample.denominator), 'Should include a numeric denominator');
    assert(sample.value === null || Number.isFinite(sample.value), 'value should be null or a number');
    assert(sample.percent === null || Number.isFinite(sample.percent), 'percent should be null or a number');

    console.log(`${checkmark} All tests passed!`);
    console.log(`  Sample: ${sample.name} (${sample.fips})`);
    console.log(`  Value: ${sample.percent !== null ? sample.percent.toFixed(2) + '%' : 'null'}`);
    console.log(`  Numerator: ${sample.numerator}, Denominator: ${sample.denominator}`);

    // Generate choropleth map
    console.log('\nGenerating choropleth map with simple API...\n');
    const mapPath = await generateCountyMap({
      field: 'B17001002',
      name: 'Poverty Rate'
    });

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const expectedPath = path.join(__dirname, 'temp', 'choropleth.png');
    assert(fs.existsSync(expectedPath), 'Choropleth PNG should exist at temp/choropleth.png');
    assert(fs.statSync(expectedPath).size > 0, 'Choropleth PNG should not be empty');

    console.log(`${checkmark} Choropleth map generated successfully`);
    console.log(`  Saved to: ${expectedPath}`);
    console.log(`  File size: ${(fs.statSync(expectedPath).size / 1024).toFixed(1)} KB`);
    console.log(`  Title: Poverty Rate by US County`);

    process.exit(0);
  } catch (error) {
    if (isRateLimitError(error)) {
      console.log('Skipping test: API rate limit reached.');
      process.exit(0);
    }

    console.error('Test failed:', error.message);
    process.exit(1);
  }
}

runTests();
