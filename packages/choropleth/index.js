/**
 * @endpoints/choropleth
 * Generate county-level choropleth maps from ACS Census data
 */

export { generateUSCountyMap, generateCountyChoroplethMap, createChoropleth } from './create-map.js';
export { getCountyRelativeStatFromCensusReporter, getCountyRelativeStat } from './get-data.js';

import { existsSync, readFileSync, writeFileSync } from 'fs';

import { createWorldMap } from './world-map.js';
import { generateUSCountyMap } from './create-map.js';

const mapsData = JSON.parse(readFileSync("./maps.json", "utf-8"));

for (const map of mapsData) {
  console.log(map)
  generateUSCountyMap({
    field: map.field,
    name: map.title,
    outputDir: './maps'
  }).catch(err => {
    console.error(`Error generating map for ${map.name}:`, err);
  });
}

const worldMaps = [
  {
    "indicator": "NY.GDP.PCAP.CD",
    "field": "gdp_per_capita",
    "title": "GDP per Capita (Current US$)",
    "info": "Gross domestic product divided by midyear population. Data from the World Bank."
  },
  {
    "indicator": "NY.GDP.MKTP.CD",
    "field": "gdp_total",
    "title": "GDP (Current US$)",
    "info": "Total economic output measured in current US dollars."
  },
  {
    "indicator": "SP.POP.TOTL",
    "field": "population_total",
    "title": "Population",
    "info": "Total midyear population."
  },
  {
    "indicator": "SP.POP.GROW",
    "field": "population_growth",
    "title": "Population Growth (%)",
    "info": "Annual population growth rate."
  },
  {
    "indicator": "SP.DYN.LE00.IN",
    "field": "life_expectancy",
    "title": "Life Expectancy (Years)",
    "info": "Average number of years a newborn is expected to live."
  },
  {
    "indicator": "EN.ATM.CO2E.PC",
    "field": "co2_per_capita",
    "title": "CO₂ Emissions per Capita",
    "info": "Carbon dioxide emissions in metric tons per person."
  },
  {
    "indicator": "EG.FEC.RNEW.ZS",
    "field": "renewable_energy_pct",
    "title": "Renewable Energy (% of total)",
    "info": "Share of renewable energy in total final energy consumption."
  },
  {
    "indicator": "IT.NET.USER.ZS",
    "field": "internet_penetration",
    "title": "Internet Users (%)",
    "info": "Percentage of population using the internet."
  },
  {
    "indicator": "SP.URB.TOTL.IN.ZS",
    "field": "urban_population_pct",
    "title": "Urban Population (%)",
    "info": "Percentage of total population living in urban areas."
  },
  {
    "indicator": "SP.DYN.IMRT.IN",
    "field": "infant_mortality",
    "title": "Infant Mortality Rate",
    "info": "Infant deaths per 1,000 live births."
  },
  {
    "indicator": "SL.UEM.TOTL.ZS",
    "field": "unemployment_rate",
    "title": "Unemployment Rate (%)",
    "info": "Percentage of total labor force that is unemployed."
  },
  {
    "indicator": "AG.LND.FRST.ZS",
    "field": "forest_area_pct",
    "title": "Forest Area (%)",
    "info": "Forest area as a percentage of total land area."
  },
  {
    "indicator": "SI.POV.GINI",
    "field": "gini_index",
    "title": "Gini Index",
    "info": "Measure of income inequality within a country."
  },
  {
    "indicator": "SH.XPD.CHEX.PC.CD",
    "field": "health_expenditure_per_capita",
    "title": "Health Expenditure per Capita (US$)",
    "info": "Current health expenditure per capita in US dollars."
  },
  {
    "indicator": "SP.DYN.TFRT.IN",
    "field": "fertility_rate",
    "title": "Fertility Rate",
    "info": "Average number of births per woman."
  },
  {
    "indicator": "IT.CEL.SETS",
    "field": "mobile_cellular_subscriptions",
    "title": "Mobile Cellular Subscriptions (per 100 people)",
    "info": "Mobile cellular telephone subscriptions per 100 people. Measures tech adoption."
  },
  {
    "indicator": "VC.IHR.PSRC.P5",
    "field": "intentional_homicide_rate",
    "title": "Intentional Homicide Rate (per 100,000)",
    "info": "Intentional homicides per 100,000 population. Measure of violent crime."
  },
  {
    "indicator": "SN.ITK.DEFC",
    "field": "prevalence_undernourishment",
    "title": "Prevalence of Undernourishment (%)",
    "info": "Percentage of population unable to afford a healthy diet."
  },
  {
    "indicator": "SE.ADT.LITR.ZS",
    "field": "adult_literacy_rate",
    "title": "Adult Literacy Rate (%)",
    "info": "Percentage of population age 15+ that can read and write."
  },
  {
    "indicator": "SH.HIV.1524",
    "field": "hiv_prevalence_youth",
    "title": "HIV Prevalence (15-24 years old, %)",
    "info": "HIV prevalence among 15-24 year olds as % of population."
  },
  {
    "indicator": "SH.TBS.INCD",
    "field": "tb_incidence_rate",
    "title": "TB Incidence (per 100,000)",
    "info": "Tuberculosis incidence per 100,000 population."
  },
  {
    "indicator": "VC.BTL.DETH",
    "field": "battle_related_deaths",
    "title": "Battle-related Deaths",
    "info": "Annual battle-related deaths. Measure of armed conflict intensity."
  },
  {
    "indicator": "AG.LND.ARBL.ZS",
    "field": "arable_land_pct",
    "title": "Arable Land (% of total land)",
    "info": "Land under temporary crops, temporary meadows, kitchen gardens and temporarily fallow land."
  },
  {
    "indicator": "NE.EXP.GNFS.CD",
    "field": "exports_goods_services",
    "title": "Exports of Goods & Services (Current US$)",
    "info": "Total exports of goods and services measured in current US dollars."
  },
  {
    "indicator": "SP.RUR.TOTL.ZS",
    "field": "rural_population_pct",
    "title": "Rural Population (% of total)",
    "info": "Rural population as a percentage of total population."
  }
];
(async () => {
  for (const map of worldMaps) {
    // const map = worldMaps[0];
    try {
      if (existsSync(`./maps/world-${map.field}.png`)) {
        console.log(`World map for ${map.title} already exists, skipping...`);
        continue;
      }
      console.log(`Generating world map for ${map.title}...`);
      const { img_buffer, year } = await createWorldMap({ width: 800, height: 480, showLegend: true, indicator: map.indicator });
      writeFileSync(`./maps/world-${year}-${map.field}.png`, img_buffer);
      console.log(`Generated world map for ${map.title}:`);
    } catch (err) {
      console.error(`Error generating world map for ${map.title}:`, err);
    }
  }
})();
/**
 * Quick start examples:
 *
 * // Simple usage: just specify field and name (defaults to grayscale, no data shown as diagonal lines)
 * import { generateCountyMap } from '@endpoints/choropleth';
 * const pngPath = await generateCountyMap({
 *   field: 'B17001002',  // Income below poverty level
 *   name: 'Poverty Rate'
 * });
 *
 * // With color scheme
 * const pngPath = await generateCountyMap({
 *   field: 'B17001002',
 *   name: 'Poverty Rate',
 *   color: 'blue'  // Options: 'grayscale', 'blue', 'red', 'green', 'purple', 'orange'
 * });
 *
 * // Advanced usage: custom ACS tables
 * import { generateCountyChoroplethMap } from '@endpoints/choropleth';
 * const pngPath = await generateCountyChoroplethMap({
 *   table: 'B01001',
 *   numerator: 'B01001002',  // Male population
 *   denominator: 'B01001001', // Total population
 *   title: 'Male Population Share by US County',
 *   color: 'blue'
 * });
 */
