import assert from "assert";
import generateFiveOClock from "./create.js";

const result = generateFiveOClock();

// Verify the result is an object with expected properties
assert(typeof result === "object", "Result should be an object");
assert(result.place, "Should have a place");
assert(result.country, "Should have a country");
assert(result.localDrink, "Should have a local drink");
assert(result.drinkCategory, "Should have a drink category");
assert(result.localTime, "Should have a local time");
assert(result.utc, "Should have UTC timestamp");
assert(result.nextPlace, "Should have next place");
assert(result.nextCountry, "Should have next country");
assert(typeof result.error === "boolean", "Error field should be a boolean");
assert(typeof result.minutesUntilNext === "number", "Minutes until next should be a number");
assert(result.img, "Should have an image");
assert(result.img instanceof Buffer, "Image should be a buffer");

console.log("✓ Five O'Clock Generator Test Passed");
delete result.img; // Remove image from output for readability
console.table(result);