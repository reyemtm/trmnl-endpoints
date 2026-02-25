// import { writeFileSync } from "fs";

function parseCondition(text = "", windSpeed = "") {
  const lower = text.toLowerCase();
  if (windSpeed.includes("20")) return "Windy";

  if (lower.includes("thunder")) return "Thunderstorms";
  if (lower.includes("snow")) return "Snow";
  if (lower.includes("rain") || lower.includes("shower")) return "Rain";
  if (lower.includes("cloud")) return "Cloudy";
  if (lower.includes("sunny")) return "Sunny";
  if (lower.includes("clear")) return "Clear";
  if (lower.includes("fog") || lower.includes("haze") || lower.includes("mist")) return "Foggy";
  if (lower.includes("wind")) return "Windy";

  return "";
}

/*icon list
/images/plugins/weather/wi-alien.svg
/images/plugins/weather/wi-barometer.svg
/images/plugins/weather/wi-celsius.svg
/images/plugins/weather/wi-cloud-down.svg
/images/plugins/weather/wi-cloud-refresh.svg
/images/plugins/weather/wi-cloud-up.svg
/images/plugins/weather/wi-cloud.svg
/images/plugins/weather/wi-cloudy-gusts.svg
/images/plugins/weather/wi-cloudy-windy.svg
/images/plugins/weather/wi-cloudy.svg
/images/plugins/weather/wi-day-cloudy-gusts.svg
/images/plugins/weather/wi-day-cloudy-high.svg
/images/plugins/weather/wi-day-cloudy-windy.svg
/images/plugins/weather/wi-day-cloudy.svg
/images/plugins/weather/wi-day-fog.svg
/images/plugins/weather/wi-day-hail.svg
/images/plugins/weather/wi-day-haze.svg
/images/plugins/weather/wi-day-light-wind.svg
/images/plugins/weather/wi-day-lightning.svg
/images/plugins/weather/wi-day-rain-mix.svg
/images/plugins/weather/wi-day-rain-wind.svg
/images/plugins/weather/wi-day-rain.svg
/images/plugins/weather/wi-day-showers.svg
/images/plugins/weather/wi-day-sleet-storm.svg
/images/plugins/weather/wi-day-sleet.svg
/images/plugins/weather/wi-day-snow-thunderstorm.svg
/images/plugins/weather/wi-day-snow-wind.svg
/images/plugins/weather/wi-day-snow.svg
/images/plugins/weather/wi-day-sprinkle.svg
/images/plugins/weather/wi-day-storm-showers.svg
/images/plugins/weather/wi-day-sunny-overcast.svg
/images/plugins/weather/wi-day-sunny.svg
/images/plugins/weather/wi-day-thunderstorm.svg
/images/plugins/weather/wi-day-windy.svg
/images/plugins/weather/wi-degrees.svg
/images/plugins/weather/wi-direction-down-left.svg
/images/plugins/weather/wi-direction-down-right.svg
/images/plugins/weather/wi-direction-down.svg
/images/plugins/weather/wi-direction-left.svg
/images/plugins/weather/wi-direction-right.svg
/images/plugins/weather/wi-direction-up-left.svg
/images/plugins/weather/wi-direction-up-right.svg
/images/plugins/weather/wi-direction-up.svg
/images/plugins/weather/wi-dust.svg
/images/plugins/weather/wi-earthquake.svg
/images/plugins/weather/wi-fahrenheit.svg
/images/plugins/weather/wi-fire.svg
/images/plugins/weather/wi-flood.svg
/images/plugins/weather/wi-fog.svg
/images/plugins/weather/wi-gale-warning.svg
/images/plugins/weather/wi-hail.svg
/images/plugins/weather/wi-horizon-alt.svg
/images/plugins/weather/wi-horizon.svg
/images/plugins/weather/wi-hot.svg
/images/plugins/weather/wi-humidity.svg
/images/plugins/weather/wi-hurricane-warning.svg
/images/plugins/weather/wi-hurricane.svg
/images/plugins/weather/wi-lightning.svg
/images/plugins/weather/wi-lunar-eclipse.svg
/images/plugins/weather/wi-meteor.svg
/images/plugins/weather/wi-moon-alt-first-quarter.svg
/images/plugins/weather/wi-moon-alt-full.svg
/images/plugins/weather/wi-moon-alt-new.svg
/images/plugins/weather/wi-moon-alt-third-quarter.svg
/images/plugins/weather/wi-moon-alt-waning-crescent-1.svg
/images/plugins/weather/wi-moon-alt-waning-crescent-2.svg
/images/plugins/weather/wi-moon-alt-waning-crescent-3.svg
/images/plugins/weather/wi-moon-alt-waning-crescent-4.svg
/images/plugins/weather/wi-moon-alt-waning-crescent-5.svg
/images/plugins/weather/wi-moon-alt-waning-crescent-6.svg
/images/plugins/weather/wi-moon-alt-waning-gibbous-1.svg
/images/plugins/weather/wi-moon-alt-waning-gibbous-2.svg
/images/plugins/weather/wi-moon-alt-waning-gibbous-3.svg
/images/plugins/weather/wi-moon-alt-waning-gibbous-4.svg
/images/plugins/weather/wi-moon-alt-waning-gibbous-5.svg
/images/plugins/weather/wi-moon-alt-waning-gibbous-6.svg
/images/plugins/weather/wi-moon-alt-waxing-crescent-1.svg
/images/plugins/weather/wi-moon-alt-waxing-crescent-2.svg
/images/plugins/weather/wi-moon-alt-waxing-crescent-3.svg
/images/plugins/weather/wi-moon-alt-waxing-crescent-4.svg
/images/plugins/weather/wi-moon-alt-waxing-crescent-5.svg
/images/plugins/weather/wi-moon-alt-waxing-crescent-6.svg
/images/plugins/weather/wi-moon-alt-waxing-gibbous-1.svg
/images/plugins/weather/wi-moon-alt-waxing-gibbous-2.svg
/images/plugins/weather/wi-moon-alt-waxing-gibbous-3.svg
/images/plugins/weather/wi-moon-alt-waxing-gibbous-4.svg
/images/plugins/weather/wi-moon-alt-waxing-gibbous-5.svg
/images/plugins/weather/wi-moon-alt-waxing-gibbous-6.svg
/images/plugins/weather/wi-moon-first-quarter.svg
/images/plugins/weather/wi-moon-full.svg
/images/plugins/weather/wi-moon-new.svg
/images/plugins/weather/wi-moon-third-quarter.svg
/images/plugins/weather/wi-moon-waning-crescent-1.svg
/images/plugins/weather/wi-moon-waning-crescent-2.svg
/images/plugins/weather/wi-moon-waning-crescent-3.svg
/images/plugins/weather/wi-moon-waning-crescent-4.svg
/images/plugins/weather/wi-moon-waning-crescent-5.svg
/images/plugins/weather/wi-moon-waning-crescent-6.svg
/images/plugins/weather/wi-moon-waning-gibbous-1.svg
/images/plugins/weather/wi-moon-waning-gibbous-2.svg
/images/plugins/weather/wi-moon-waning-gibbous-3.svg
/images/plugins/weather/wi-moon-waning-gibbous-4.svg
/images/plugins/weather/wi-moon-waning-gibbous-5.svg
/images/plugins/weather/wi-moon-waning-gibbous-6.svg
/images/plugins/weather/wi-moon-waxing-6.svg
/images/plugins/weather/wi-moon-waxing-crescent-1.svg
/images/plugins/weather/wi-moon-waxing-crescent-2.svg
/images/plugins/weather/wi-moon-waxing-crescent-3.svg
/images/plugins/weather/wi-moon-waxing-crescent-4.svg
/images/plugins/weather/wi-moon-waxing-crescent-5.svg
/images/plugins/weather/wi-moon-waxing-gibbous-1.svg
/images/plugins/weather/wi-moon-waxing-gibbous-2.svg
/images/plugins/weather/wi-moon-waxing-gibbous-3.svg
/images/plugins/weather/wi-moon-waxing-gibbous-4.svg
/images/plugins/weather/wi-moon-waxing-gibbous-5.svg
/images/plugins/weather/wi-moon-waxing-gibbous-6.svg
/images/plugins/weather/wi-moonrise.svg
/images/plugins/weather/wi-moonset.svg
/images/plugins/weather/wi-na.svg
/images/plugins/weather/wi-night-alt-cloudy-gusts.svg
/images/plugins/weather/wi-night-alt-cloudy-high.svg
/images/plugins/weather/wi-night-alt-cloudy-windy.svg
/images/plugins/weather/wi-night-alt-cloudy.svg
/images/plugins/weather/wi-night-alt-hail.svg
/images/plugins/weather/wi-night-alt-lightning.svg
/images/plugins/weather/wi-night-alt-partly-cloudy.svg
/images/plugins/weather/wi-night-alt-rain-mix.svg
/images/plugins/weather/wi-night-alt-rain-wind.svg
/images/plugins/weather/wi-night-alt-rain.svg
/images/plugins/weather/wi-night-alt-showers.svg
/images/plugins/weather/wi-night-alt-sleet-storm.svg
/images/plugins/weather/wi-night-alt-sleet.svg
/images/plugins/weather/wi-night-alt-snow-thunderstorm.svg
/images/plugins/weather/wi-night-alt-snow-wind.svg
/images/plugins/weather/wi-night-alt-snow.svg
/images/plugins/weather/wi-night-alt-sprinkle.svg
/images/plugins/weather/wi-night-alt-storm-showers.svg
/images/plugins/weather/wi-night-alt-thunderstorm.svg
/images/plugins/weather/wi-night-clear.svg
/images/plugins/weather/wi-night-cloudy-gusts.svg
/images/plugins/weather/wi-night-cloudy-high.svg
/images/plugins/weather/wi-night-cloudy-windy.svg
/images/plugins/weather/wi-night-cloudy.svg
/images/plugins/weather/wi-night-fog.svg
/images/plugins/weather/wi-night-hail.svg
/images/plugins/weather/wi-night-lightning.svg
/images/plugins/weather/wi-night-partly-cloudy.svg
/images/plugins/weather/wi-night-rain-mix.svg
/images/plugins/weather/wi-night-rain-wind.svg
/images/plugins/weather/wi-night-rain.svg
/images/plugins/weather/wi-night-showers.svg
/images/plugins/weather/wi-night-sleet-storm.svg
/images/plugins/weather/wi-night-sleet.svg
/images/plugins/weather/wi-night-snow-thunderstorm.svg
/images/plugins/weather/wi-night-snow-wind.svg
/images/plugins/weather/wi-night-snow.svg
/images/plugins/weather/wi-night-sprinkle.svg
/images/plugins/weather/wi-night-storm-showers.svg
/images/plugins/weather/wi-night-thunderstorm.svg
/images/plugins/weather/wi-rain-mix.svg
/images/plugins/weather/wi-rain-wind.svg
/images/plugins/weather/wi-rain.svg
/images/plugins/weather/wi-raindrop.svg
/images/plugins/weather/wi-raindrops.svg
/images/plugins/weather/wi-refresh-alt.svg
/images/plugins/weather/wi-refresh.svg
/images/plugins/weather/wi-sandstorm.svg
/images/plugins/weather/wi-showers.svg
/images/plugins/weather/wi-sleet.svg
/images/plugins/weather/wi-small-craft-advisory.svg
/images/plugins/weather/wi-smog.svg
/images/plugins/weather/wi-smoke.svg
/images/plugins/weather/wi-snow-wind.svg
/images/plugins/weather/wi-snow.svg
/images/plugins/weather/wi-snowflake-cold.svg
/images/plugins/weather/wi-solar-eclipse.svg
/images/plugins/weather/wi-sprinkle.svg
/images/plugins/weather/wi-stars.svg
/images/plugins/weather/wi-storm-showers.svg
/images/plugins/weather/wi-storm-warning.svg
/images/plugins/weather/wi-strong-wind.svg
/images/plugins/weather/wi-sunrise.svg
/images/plugins/weather/wi-sunset.svg
/images/plugins/weather/wi-thermometer-exterior.svg
/images/plugins/weather/wi-thermometer-internal.svg
/images/plugins/weather/wi-thermometer.svg
/images/plugins/weather/wi-thunderstorm.svg
/images/plugins/weather/wi-time-1.svg
/images/plugins/weather/wi-time-10.svg
/images/plugins/weather/wi-time-11.svg
/images/plugins/weather/wi-time-12.svg
/images/plugins/weather/wi-time-2.svg
/images/plugins/weather/wi-time-3.svg
/images/plugins/weather/wi-time-4.svg
/images/plugins/weather/wi-time-5.svg
/images/plugins/weather/wi-time-6.svg
/images/plugins/weather/wi-time-7.svg
/images/plugins/weather/wi-time-8.svg
/images/plugins/weather/wi-time-9.svg
/images/plugins/weather/wi-tornado.svg
/images/plugins/weather/wi-train.svg
/images/plugins/weather/wi-tsunami.svg
/images/plugins/weather/wi-umbrella.svg
/images/plugins/weather/wi-volcano.svg
/images/plugins/weather/wi-wind-beaufort-0.svg
/images/plugins/weather/wi-wind-beaufort-1.svg
/images/plugins/weather/wi-wind-beaufort-10.svg
/images/plugins/weather/wi-wind-beaufort-11.svg
/images/plugins/weather/wi-wind-beaufort-12.svg
/images/plugins/weather/wi-wind-beaufort-2.svg
/images/plugins/weather/wi-wind-beaufort-3.svg
/images/plugins/weather/wi-wind-beaufort-4.svg
/images/plugins/weather/wi-wind-beaufort-5.svg
/images/plugins/weather/wi-wind-beaufort-6.svg
/images/plugins/weather/wi-wind-beaufort-7.svg
/images/plugins/weather/wi-wind-beaufort-8.svg
/images/plugins/weather/wi-wind-beaufort-9.svg
/images/plugins/weather/wi-wind-deg.svg
/images/plugins/weather/wi-windy.svg
*/

function parseIcon(text = "", windSpeed = "") {
  const lower = text.toLowerCase();
  const hasWind = windSpeed.includes("20") || lower.includes("wind");
  const hasThunder = lower.includes("thunder");
  const hasSnow = lower.includes("snow");
  const hasRain = lower.includes("rain") || lower.includes("shower");
  const hasSleet = lower.includes("sleet");
  const hasHail = lower.includes("hail");
  const hasSprinkle = lower.includes("sprinkle");
  const hasCloud = lower.includes("cloud") || lower.includes("overcast");
  const hasSunny = lower.includes("sunny");
  const hasClear = lower.includes("clear");
  const hasFog = lower.includes("fog") || lower.includes("haze") || lower.includes("mist");
  const hasPartly = lower.includes("partly");

  // Thunderstorm combinations
  if (hasThunder && hasSnow) return "wi-day-snow-thunderstorm";
  if (hasThunder && hasRain) return "wi-day-thunderstorm";
  if (hasThunder) return "wi-day-thunderstorm";

  // Snow combinations
  if (hasSnow && hasWind) return "wi-day-snow-wind";
  if (hasSnow && hasSleet) return "wi-day-sleet-storm";
  if (hasSnow) return "wi-day-snow";

  // Sleet combinations
  if (hasSleet && hasThunder) return "wi-day-sleet-storm";
  if (hasSleet && hasWind) return "wi-day-sleet";
  if (hasSleet) return "wi-day-sleet";

  // Hail
  if (hasHail) return "wi-day-hail";

  // Rain combinations
  if (hasRain && hasWind) return "wi-day-rain-wind";
  if (hasRain && hasSnow) return "wi-day-rain-mix";
  if (hasRain && hasSleet) return "wi-day-rain-mix";
  if (hasRain && hasSprinkle) return "wi-day-sprinkle";
  if (hasRain && hasCloud && hasWind) return "wi-day-rain-wind";
  if (hasRain) return "wi-day-rain";

  // Sprinkle
  if (hasSprinkle) return "wi-day-sprinkle";

  // Showers
  if (lower.includes("showers")) return "wi-day-showers";

  // Cloudy combinations
  if (hasCloud && hasWind) return "wi-day-cloudy-windy";
  if (hasCloud) return "wi-day-cloudy";

  // Sunny/Clear
  if (hasPartly && hasSunny) return "wi-day-sunny-overcast";
  if (hasSunny || hasClear) return "wi-day-sunny";

  // Fog
  if (hasFog) return "wi-day-fog";

  // Default wind
  if (hasWind) return "wi-day-windy";

  return "";
}

function parseTemperatureArray(periods) {
  const result = [];
  for (const period of periods) {
    result.push([
      new Date(period.startTime),
      period.temperature,
    ]);
  }
  return result;
}

function getDailyHighsLows(periods) {
  const daysMap = new Map();

  for (const period of periods) {
    const date = new Date(period.startTime);

    // Get local date key (YYYY-MM-DD)
    const dateKey = date.toLocaleDateString("en-CA");
    // en-CA gives YYYY-MM-DD format reliably

    const dayName = date.toLocaleDateString("en-US", {
      weekday: "short"
    });

    if (!daysMap.has(dateKey)) {
      daysMap.set(dateKey, {
        date: dateKey,
        day: dayName,
        high: null,
        low: null,
        condition: parseCondition(period.detailedForecast, period.windSpeed),
        icon: parseIcon(period.detailedForecast, period.windSpeed),
      });
    }

    const dayEntry = daysMap.get(dateKey);

    if (period.isDaytime) {
      dayEntry.high = dayEntry.high === null
        ? period.temperature
        : Math.max(dayEntry.high, period.temperature);

      // Use daytime period as main condition
      if (!dayEntry.condition) {
        dayEntry.condition = parseCondition(period.shortForecast, period.windSpeed);
      }
      if (!dayEntry.icon) {
        dayEntry.icon = parseIcon(period.shortForecast, period.windSpeed);
      }
      if (!dayEntry.detail) {
        dayEntry.detail = period.detailedForecast;
      }
      if (!dayEntry.forecast) {
        dayEntry.forecast = period.shortForecast;
      }
      if (!dayEntry.windSpeed) {
        dayEntry.windSpeed = period.windSpeed;
      }
    } else {
      dayEntry.low = dayEntry.low === null
        ? period.temperature
        : Math.min(dayEntry.low, period.temperature);
    }
  }

  const array = Array.from(daysMap.values());

  array[0].day = "Now";
  // if (array.length > 1) {
  //   array[1].day = "Tomorrow";
  // }

  return Array.from(daysMap.values());
}

async function fetchNWSForecast({ lat, lng }) {
  const url = `https://api.weather.gov/points/${lat},${lng}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data.properties || !data.properties.forecast) {
      throw new Error("No forecast data available");
    }
    // return data
    const forecastUrl = data.properties.forecast;
    // console.log("Fetching forecast from:", forecastUrl);
    const forecastResponse = await fetch(forecastUrl);
    if (!forecastResponse.ok) {
      throw new Error(`HTTP error! status: ${forecastResponse.status}`);
    }
    const forecastData = await forecastResponse.json();
    const stationsUrl = data.properties.observationStations;
    // return stationsUrl
    const stationsResponse = await fetch(stationsUrl);
    if (!stationsResponse.ok) {
      throw new Error(`HTTP error! status: ${stationsResponse.status}`);
    }
    const stationData = await stationsResponse.json();
    const stationId = stationData.features[0].id;
    // return stationId;
    const currentRes = await fetch(
      `https://api.weather.gov/stations/${stationId.split("/").pop()}/observations/latest`);
    if (!currentRes.ok) {
      throw new Error(`HTTP error! status: ${currentRes.status}`);
    }
    const currentConditions = await currentRes.json();

    const highLows = getDailyHighsLows(forecastData.properties.periods);
    if (currentConditions?.properties?.temperature?.value || currentConditions?.properties?.temperature?.value === 0) {
      currentConditions.properties.temperature.value_farenheit = Math.round(currentConditions.properties.temperature.value * 9 / 5 + 32);
    }
    const json = {
      current: currentConditions,
      forecast: highLows,
      trend: parseTemperatureArray(forecastData.properties.periods),
      generated: new Date().toISOString(),
      raw_forecast: {
        ...forecastData,
        properties: {
          ...forecastData.properties,
          area: data.properties.relativeLocation?.properties,
        }
      }
    };
    // writeFileSync(new URL("./latest.json", import.meta.url), JSON.stringify(json, null, 2));
    return json;
  } catch (error) {
    console.error("Error fetching NWS forecast:", error);
    return null;
  }
}


export { fetchNWSForecast };