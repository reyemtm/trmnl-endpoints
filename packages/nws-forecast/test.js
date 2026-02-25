import assert from 'assert';
import { fetchNWSForecast } from './index.js';

const checkmark = "\x1b[32m✓\x1b[0m";

async function runTests() {
  console.log('Testing @endpoints/nws-forecast...\n');

  try {
    // Test with real coordinates (San Francisco)
    const forecast = await fetchNWSForecast({
      lat: 37.7749,
      lng: -122.4194
    });

    console.log(`${checkmark} fetchNWSForecast executed successfully`);

    // Check basic structure
    assert(forecast, 'Should return an object');
    assert(forecast.current, 'Should have current object');
    assert(forecast.forecast, 'Should have forecast array');
    assert(Array.isArray(forecast.forecast), 'forecast should be an array');
    assert(forecast.trend, 'Should have trend property');
    assert(Array.isArray(forecast.trend), 'trend should be an array');
    assert(forecast.generated, 'Should have generated timestamp');
    assert(forecast.raw_forecast.properties, 'Should have properties object');

    console.log(`${checkmark} Object structure is valid\n`);

    // Check forecast data structure
    if (forecast.forecast.length > 0) {
      const firstDay = forecast.forecast[0];
      assert(firstDay.date, 'Forecast day should have date');
      assert(firstDay.day, 'Forecast day should have day');
      assert(typeof firstDay.high === 'number' || firstDay.high === null, 'high should be number or null');
      assert(typeof firstDay.low === 'number' || firstDay.low === null, 'low should be number or null');
      assert(firstDay.condition, 'Forecast day should have condition');
      assert(firstDay.icon, 'Forecast day should have icon');

      console.log(`${checkmark} Forecast structure is valid`);
      console.log(`  First day: ${firstDay.day} - High: ${firstDay.high}°F, Low: ${firstDay.low}°F`);
      console.log(`  Condition: ${firstDay.condition} (${firstDay.icon})\n`);
    }

    // Check current conditions structure
    if (forecast.current?.properties?.temperature) {
      const temp = forecast.current.properties.temperature;
      console.log(`${checkmark} Current conditions available`);
      console.log(`  Temperature: ${temp.value_farenheit}°F (${temp.value}°C)\n`);
    }

    console.log(`${checkmark} All tests passed!`);
    process.exit(0);
  } catch (error) {
    console.error('Test failed:', error.message);
    process.exit(1);
  }
}

runTests();
