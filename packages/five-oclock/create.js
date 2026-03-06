import { geoNaturalEarth1, geoPath } from "d3-geo";

import { createRequire } from "module";
import generateCities from "./cities.js";
import worldGeoJSON from "./world-110m.json" with { type: "json" };

const require = createRequire(import.meta.url);

function getCanvasCreator() {
  try {
    return require("canvas").createCanvas;
  } catch {
    return null;
  }
}

const { cities, drinks } = generateCities();

function generateMapImage(city) {
  const createCanvas = getCanvasCreator();
  if (!createCanvas) {
    return null;
  }

  const width = 400;
  const height = 240;

  // const worldMinusAntarctica = {
  //   type: "FeatureCollection",
  //   features: worldGeoJSON.features.filter(f => f.properties.name !== "Antarctica")
  // };

  const projection = geoNaturalEarth1()
    .fitSize([width, height], worldGeoJSON);

  const path = geoPath().projection(projection);

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  // Draw map features
  context.fillStyle = "#ddd";
  context.strokeStyle = "#aaa";
  context.lineWidth = 0.35;

  worldGeoJSON.features.forEach(feature => {
    context.beginPath();
    path.context(context)(feature);
    context.fill();
    context.stroke();
  });

  // Draw city marker
  const [x, y] = projection([city.lng, city.lat]);
  context.fillStyle = "#888";
  context.beginPath();
  context.arc(x, y, 4, 0, Math.PI * 2);
  context.fill();

  //gray
  context.fillStyle = "#000";
  context.beginPath();
  context.arc(x, y, 2, 0, Math.PI * 2);
  context.fill();


  return canvas.toBuffer("image/png");
}

function fivePmLongitude(date) {
  const utc = getUTCHoursDecimal(date);
  let lon = (17 - utc) * 15;

  // normalize
  lon = ((lon + 180) % 360 + 360) % 360 - 180;

  return lon;
}

function getUTCHoursDecimal(date) {
  return (
    date.getUTCHours() +
    date.getUTCMinutes() / 60 +
    date.getUTCSeconds() / 3600
  );
}

function longitudeBandPolygon(centerLon, widthDeg = 15) {
  const half = widthDeg / 2;

  return {
    type: "Polygon",
    coordinates: [[
      [centerLon - half, -90],
      [centerLon + half, -90],
      [centerLon + half, 90],
      [centerLon - half, 90],
      [centerLon - half, -90]
    ]]
  };
}

function getLocalMinutes(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "numeric",
    hour12: false
  }).formatToParts(date);

  const hour = Number(parts.find(p => p.type === "hour").value);
  const minute = Number(parts.find(p => p.type === "minute").value);

  return hour * 60 + minute;
}

function minutesUntilFive(localMinutes) {
  const fivePM = 17 * 60;
  return (fivePM - localMinutes + 1440) % 1440;
}

function getLocalTimeString(date, timeZone) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "numeric",
    hour12: true
  }).format(date);
}

const state = {
  current: null,
  next: null
}

function generateFiveOClock() {
  const now = new Date();

  const enriched = cities.map(city => {
    const localMinutes = getLocalMinutes(now, city.timeZone);
    const until = minutesUntilFive(localMinutes);

    return {
      ...city,
      localMinutes,
      minutesUntil: until,
      distanceFromFive: Math.min(until, 1440 - until)
    };
  });

  const sorted = [...enriched].sort(
    (a, b) => a.distanceFromFive - b.distanceFromFive
  );

  // Find cities between 5 PM and 6 PM
  const fivePMWindow = enriched.filter(city =>
    city.localMinutes >= 1020 && city.localMinutes < 1080
  );

  // Randomly pick from the window, or fall back to closest to 5 PM
  const hasError = fivePMWindow.length === 0;
  const current = fivePMWindow.length > 0
    ? fivePMWindow[Math.floor(Math.random() * fivePMWindow.length)]
    : sorted[0];

  const next = [...enriched]
    .filter(c => c.minutesUntil > 0)
    .sort((a, b) => a.minutesUntil - b.minutesUntil)[0];

  state.current = current;
  state.next = next;

  return {
    error: hasError,
    place: current.name,
    country: current.country,
    localDrink: current.drink,
    drinkIngredients: drinks.find(d => d.name === current.drink)?.ingredients?.join(" | ") || [],
    drinkCategory: drinks.find(d => d.name === current.drink)?.category || "unknown",
    localTime: getLocalTimeString(now, current.timeZone),
    utc: now.toISOString(),
    nextPlace: next.name,
    nextCountry: next.country,
    minutesUntilNext: next.minutesUntil,
    img: generateMapImage(current)
  };
}

// const city = generateFiveOClock();
// console.log(city);
// writeFileSync("./map.png", city.img);

export default generateFiveOClock;