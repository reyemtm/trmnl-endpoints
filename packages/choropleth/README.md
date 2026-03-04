# @endpoints/choropleth

Generate county-level choropleth maps from Census Bureau ACS data via Census Reporter API.

## Quick Start

```javascript
import { generateCountyMap } from '@endpoints/choropleth';

// Generate poverty rate map
const pngPath = await generateCountyMap({
  field: 'B17001002',
  name: 'Poverty Rate'
});
```

## Features

- **Grayscale by default** - optimized for TRMNL monochrome displays
- **No-data diagonal lines** - missing data shown with diagonal pattern fill
- **Optional colors** - 'grayscale', 'blue', 'red', 'green', 'purple', 'orange'
- **800x480 resolution** - perfect for TRMNL devices
- **Roboto font** - clean, modern sans-serif typography
- **Automatic standardization** - converts raw Census counts to percentages by county totals

## Available Data Fields

Common Census Bureau fields for choropleth visualization:

| Field ID | Display Name | Description |
|----------|--------------|-------------|
| B17001002 | Poverty Rate | Income in the past 12 months below poverty level |
| B19013001 | Median Income | Median household income in the past 12 months |
| B23025005 | Unemployment Rate | In labor force - Unemployment |
| B01003001 | Total Population | Total population (use with any numerator for % of total) |
| B01001002 | Male Population Pct | Percentage of population that is male |
| B01001026 | Female Population Pct | Percentage of population that is female |
| B15003022 | Bachelor's Degree | Bachelor's degree or higher |
| B25004002 | Renter Occupied | Percentage of occupied housing units that are renter-occupied |
| B25003002 | Renter Occupied Housing | Renter-occupied housing units |
| B06009002 | Bachelors or Higher | Population 25+ with bachelor's degree or higher |
| B23025002 | Labor Force Participation | Civilian labor force |
| B16001003 | Age 5+ Speaks English Only | Population age 5+ speaking only English |
| B02001002 | White Population | White alone population |
| B02001003 | Black Population | Black or African American alone population |
| B02001005 | Asian Population | Asian alone population |
| B03003003 | Hispanic or Latino | Hispanic or Latino population |
| B25077001 | Median Home Value | Median value of owner-occupied housing units |
| B25064001 | Median Rent | Median contract rent |
| B08006001 | Total Workers | Total workers 16+, commute to work |
| B08006009 | Drive Alone | Drove alone to work |
| B08006037 | Public Transit | Public transportation to work |

## Usage Examples

### Basic usage (defaults to grayscale)

```javascript
import { generateCountyMap } from '@endpoints/choropleth';

const pngPath = await generateCountyMap({
  field: 'B17001002',
  name: 'Poverty Rate'
});
```

### With color scheme

```javascript
const pngPath = await generateCountyMap({
  field: 'B19013001',
  name: 'Median Household Income',
  color: 'blue'
});
```

### Custom dimensions

```javascript
const pngPath = await generateCountyMap({
  field: 'B23025005',
  name: 'Unemployment Rate',
  width: 1024,
  height: 600,
  color: 'red'
});
```

### Advanced: Custom tables and numerators

```javascript
import { generateCountyChoroplethMap } from '@endpoints/choropleth';

// Show percentage of workforce in labor force
const pngPath = await generateCountyChoroplethMap({
  table: 'B23025',
  numerator: 'B23025002',     // Civilian labor force
  denominator: 'B23025001',    // Total population 16+
  title: 'Labor Force Participation by County',
  color: 'blue'
});
```

## Output

Maps are saved to `temp/choropleth.png` and cleared on each generation.

Returns PNG path: `/path/to/packages/choropleth/temp/choropleth.png`

## Data Source

All data comes from the [Census Reporter API](https://censusreporter.org/), using the latest available American Community Survey (ACS) 5-year estimates.

## Docker/Alpine Notes

Requires Roboto and Noto fonts:

```dockerfile
RUN apk add --no-cache font-roboto font-noto
```

Or on Ubuntu:

```bash
apt install fonts-roboto fonts-noto
```

## API Reference

### `generateCountyMap(options)`

Simple interface - provide a Census field and display name.

**Options:**
- `field` (string, required) - ACS field ID (e.g., "B17001002")
- `name` (string, required) - Display name for the metric
- `color` (string, default: 'grayscale') - Color scheme
- `width` (number, default: 800) - Canvas width in pixels
- `height` (number, default: 480) - Canvas height in pixels

**Returns:** Path to PNG file

### `generateCountyChoroplethMap(options)`

Advanced interface - specify table, numerator, and denominator.

**Options:**
- `table` (string, required) - ACS table ID
- `numerator` (string|string[], required) - Numerator field(s)
- `denominator` (string, required) - Denominator field
- `title` (string) - Map title
- `color` (string, default: 'grayscale') - Color scheme
- `width` (number, default: 800)
- `height` (number, default: 480)

**Returns:** Path to PNG file

## Testing

```bash
npm test
```
