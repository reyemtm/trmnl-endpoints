// acsCountyChoropleth.js
// Node 22+ (native fetch)

const CENSUS_BASE = 'https://api.census.gov/data';
const CENSUS_REPORTER_BASE = 'https://api.censusreporter.org/1.0';

/**
 * Get latest available ACS 5-year dataset year
 */
async function getLatestAcs5Year() {
  const res = await fetch(`${CENSUS_BASE}.json`);
  const meta = await res.json();

  const latest = meta.dataset
    .filter(d => d.title?.includes('ACS 5-Year Estimates'))
    .map(d => ({
      year: parseInt(d.c_vintage, 10),
      url: d.distribution?.[0]?.accessURL
    }))
    .filter(d => d.year && d.url)
    .sort((a, b) => b.year - a.year)[0];

  return latest.year;
}

/**
 * Fetch relative county-level stat for entire US
 *
 * @param {Object} options
 * @param {string} options.table - ACS table (ex: "B17001")
 * @param {string|string[]} options.numerator - variable(s) for numerator
 * @param {string} options.denominator - denominator variable
 * @param {string} options.apiKey - Census API key
 */
export async function getCountyRelativeStat({
  table,
  numerator,
  denominator,
  apiKey
}) {
  const year = await getLatestAcs5Year();

  const numerators = Array.isArray(numerator)
    ? numerator
    : [numerator];

  const variables = [...numerators, denominator].join(',');

  const url =
    `${CENSUS_BASE}/${year}/acs/acs5` +
    `?get=NAME,${variables}` +
    `&for=county:*` +
    `&in=state:*` +
    (apiKey ? `&key=${apiKey}` : '');

  const res = await fetch(url);
  const json = await res.json();

  const headers = json[0];
  const rows = json.slice(1);

  const denominatorIdx = headers.indexOf(denominator);
  const numeratorIdxs = numerators.map(v => headers.indexOf(v));

  const stateIdx = headers.indexOf('state');
  const countyIdx = headers.indexOf('county');

  return rows.map(row => {
    const numeratorValue = numeratorIdxs
      .map(i => Number(row[i]))
      .reduce((sum, val) => sum + (isNaN(val) ? 0 : val), 0);

    const denominatorValue = Number(row[denominatorIdx]);

    const value =
      denominatorValue > 0
        ? numeratorValue / denominatorValue
        : null;

    const state = row[stateIdx];
    const county = row[countyIdx];

    return {
      name: row[0],
      fips: `${state}${county}`, // 5-digit county FIPS
      value,                      // decimal (0–1)
      percent: value !== null ? value * 100 : null,
      numerator: numeratorValue,
      denominator: denominatorValue
    };
  });
}

/**
 * Fetch relative county-level stat for entire US using Census Reporter API
 *
 * @param {Object} options
 * @param {string} options.table - ACS table (ex: "B17001")
 * @param {string|string[]} options.numerator - variable(s) for numerator (supports B17001001 or B17001_001E format)
 * @param {string} options.denominator - denominator variable
 * @param {string} [options.acs='latest'] - ACS release (e.g., 'acs2021_5yr' or 'latest')
 */
export async function getCountyRelativeStatFromCensusReporter({
  table,
  numerator,
  denominator,
  acs = 'latest'
}) {
  /**
   * Normalize Census.gov format (B17001_001E) to Census Reporter format (B17001001)
   */
  function normalizeCensusId(id) {
    return id.replace(/_\d+([A-Z])$/, '$1');
  }

  const numerators = Array.isArray(numerator)
    ? numerator.map(normalizeCensusId)
    : [normalizeCensusId(numerator)];

  denominator = normalizeCensusId(denominator);

  const url =
    `${CENSUS_REPORTER_BASE}/data/show/${acs}` +
    `?table_ids=${table}` +
    `&geo_ids=050|01000US`; // all US counties (summary level 050)

  const res = await fetch(url);
  const json = await res.json();

  const results = [];

  // json.data is keyed by geoid, then table_id
  for (const [geoid, tables] of Object.entries(json.data)) {
    const tableData = tables[table];
    if (!tableData) continue;

    const estimates = tableData.estimate;

    const numeratorValue = numerators
      .map(col => Number(estimates[col]) || 0)
      .reduce((sum, val) => sum + val, 0);

    const denominatorValue = Number(estimates[denominator]) || 0;

    const value =
      denominatorValue > 0
        ? numeratorValue / denominatorValue
        : null;

    // Extract FIPS from geoid (format: "05000USxxxxx" -> last 5 digits)
    const fips = geoid.slice(-5);

    results.push({
      name: json.geography[geoid].name,
      fips,
      value,
      percent: value !== null ? value * 100 : null,
      numerator: numeratorValue,
      denominator: denominatorValue
    });
  }

  return results;
}