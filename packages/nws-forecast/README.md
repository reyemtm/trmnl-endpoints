# @endpoints/nws-forecast

Simple weather forecast endpoint. Takes latitude and longitude coordinates as an input and returns a comprehensive National Weather Service (NWS) forecast data with current conditions, daily highs/lows, and the upcoming forecast. The project was created for a [trmnl](https://trmnl.com) e-ink display plugin, but can be used in any JavaScript environment.

## Installation

```bash
npm install github:reyemtm/trmnl-endpoints#subdirectory=packages/nws-forecast
```

## Usage

```javascript
import { fetchNWSForecast } from '@endpoints/nws-forecast';

const forecast = await fetchNWSForecast({
  lat: 40.7128,
  lng: -74.0060
});

console.log(forecast.current);     // Current conditions from nearest station
console.log(forecast.forecast);    // Array of daily forecasts with high/low temps
console.log(forecast.trend);       // Formatted for charting
```

## Returns

- `current` - Current conditions from nearest weather station
- `forecast` - Array of daily forecasts with:
  - `date` - ISO date string
  - `day` - Day abbreviation
  - `high` - High temperature (°F)
  - `low` - Low temperature (°F)
  - `condition` - Parsed condition (Sunny, Cloudy, Rain, etc.)
  - `icon` - Weather icon name (wi-*)
  - `forecast` - Short forecast text
  - `windSpeed` - Wind speed info
- `trend` - `[Date, temperature]` tuples for charting
- `raw_forecast` - Full NWS forecast properties
- `generated` - Timestamp

## Related Endpoints

Part of the [@endpoints](https://github.com/reyemtm/trmnl-endpoints) collection - simple lambda-type functions that take 1 input and return focused data.

## Sample Response

```json
{
  "current": {
    "@context": [
      "https://geojson.org/geojson-ld/geojson-context.jsonld",
      {
        "@version": "1.1",
        "wx": "https://api.weather.gov/ontology#",
        "s": "https://schema.org/",
        "geo": "http://www.opengis.net/ont/geosparql#",
        "unit": "http://codes.wmo.int/common/unit/",
        "@vocab": "https://api.weather.gov/ontology#",
        "geometry": {
          "@id": "s:GeoCoordinates",
          "@type": "geo:wktLiteral"
        },
        "city": "s:addressLocality",
        "state": "s:addressRegion",
        "distance": {
          "@id": "s:Distance",
          "@type": "s:QuantitativeValue"
        },
        "bearing": {
          "@type": "s:QuantitativeValue"
        },
        "value": {
          "@id": "s:value"
        },
        "unitCode": {
          "@id": "s:unitCode",
          "@type": "@id"
        },
        "forecastOffice": {
          "@type": "@id"
        },
        "forecastGridData": {
          "@type": "@id"
        },
        "publicZone": {
          "@type": "@id"
        },
        "county": {
          "@type": "@id"
        }
      }
    ],
    "id": "https://api.weather.gov/stations/SFOC1/observations/2026-02-25T11:43:00+00:00",
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [
        -122.43,
        37.77
      ]
    },
    "properties": {
      "@id": "https://api.weather.gov/stations/SFOC1/observations/2026-02-25T11:43:00+00:00",
      "@type": "wx:ObservationStation",
      "elevation": {
        "unitCode": "wmoUnit:m",
        "value": 45.7
      },
      "station": "https://api.weather.gov/stations/SFOC1",
      "stationId": "SFOC1",
      "stationName": "SAN FRANCISCO DOWNTOWN",
      "timestamp": "2026-02-25T11:43:00+00:00",
      "rawMessage": "",
      "textDescription": "",
      "icon": null,
      "presentWeather": [],
      "temperature": {
        "unitCode": "wmoUnit:degC",
        "value": 14.76,
        "qualityControl": "V",
        "value_farenheit": 59
      },
      "dewpoint": {
        "unitCode": "wmoUnit:degC",
        "value": 14.76,
        "qualityControl": "V"
      },
      "windDirection": {
        "unitCode": "wmoUnit:degree_(angle)",
        "value": null,
        "qualityControl": "Z"
      },
      "windSpeed": {
        "unitCode": "wmoUnit:km_h-1",
        "value": null,
        "qualityControl": "Z"
      },
      "windGust": {
        "unitCode": "wmoUnit:km_h-1",
        "value": null,
        "qualityControl": "Z"
      },
      "barometricPressure": {
        "unitCode": "wmoUnit:Pa",
        "value": null,
        "qualityControl": "Z"
      },
      "seaLevelPressure": {
        "unitCode": "wmoUnit:Pa",
        "value": null,
        "qualityControl": "Z"
      },
      "visibility": {
        "unitCode": "wmoUnit:m",
        "value": null,
        "qualityControl": "Z"
      },
      "maxTemperatureLast24Hours": {
        "unitCode": "wmoUnit:degC",
        "value": null
      },
      "minTemperatureLast24Hours": {
        "unitCode": "wmoUnit:degC",
        "value": null
      },
      "precipitationLast3Hours": {
        "unitCode": "wmoUnit:mm",
        "value": null,
        "qualityControl": "Z"
      },
      "relativeHumidity": {
        "unitCode": "wmoUnit:percent",
        "value": 100,
        "qualityControl": "V"
      },
      "windChill": {
        "unitCode": "wmoUnit:degC",
        "value": null,
        "qualityControl": "V"
      },
      "heatIndex": {
        "unitCode": "wmoUnit:degC",
        "value": null,
        "qualityControl": "V"
      },
      "cloudLayers": []
    }
  },
  "forecast": [
    {
      "date": "2026-02-25",
      "day": "Now",
      "high": 64,
      "low": 53,
      "condition": "Rain",
      "icon": "wi-day-rain-wind",
      "detail": "Mostly cloudy. High near 64, with temperatures falling to around 61 in the afternoon. West southwest wind 2 to 6 mph.",
      "forecast": "Mostly Cloudy",
      "windSpeed": "2 to 6 mph"
    },
    {
      "date": "2026-02-26",
      "day": "Thu",
      "high": 68,
      "low": 54,
      "condition": "Sunny",
      "icon": "wi-day-sunny",
      "detail": "Mostly sunny, with a high near 68. North wind 2 to 6 mph.",
      "forecast": "Mostly Sunny",
      "windSpeed": "2 to 6 mph"
    },
    {
      "date": "2026-02-27",
      "day": "Fri",
      "high": 70,
      "low": 55,
      "condition": "Sunny",
      "icon": "wi-day-sunny-overcast",
      "detail": "Partly sunny, with a high near 70.",
      "forecast": "Partly Sunny",
      "windSpeed": "2 to 6 mph"
    },
    {
      "date": "2026-02-28",
      "day": "Sat",
      "high": 66,
      "low": 54,
      "condition": "Sunny",
      "icon": "wi-day-sunny-overcast",
      "detail": "Partly sunny, with a high near 66.",
      "forecast": "Partly Sunny",
      "windSpeed": "2 to 7 mph"
    },
    {
      "date": "2026-03-01",
      "day": "Sun",
      "high": 64,
      "low": 51,
      "condition": "Rain",
      "icon": "wi-day-rain",
      "detail": "A slight chance of rain after 4pm. Partly sunny, with a high near 64.",
      "forecast": "Partly Sunny then Slight Chance Light Rain",
      "windSpeed": "3 to 8 mph"
    },
    {
      "date": "2026-03-02",
      "day": "Mon",
      "high": 64,
      "low": 51,
      "condition": "Sunny",
      "icon": "wi-day-sunny",
      "detail": "Mostly sunny, with a high near 64.",
      "forecast": "Mostly Sunny",
      "windSpeed": "3 to 8 mph"
    },
    {
      "date": "2026-03-03",
      "day": "Tue",
      "high": 66,
      "low": null,
      "condition": "Sunny",
      "icon": "wi-day-sunny",
      "detail": "Mostly sunny, with a high near 66.",
      "forecast": "Mostly Sunny",
      "windSpeed": "3 to 7 mph"
    }
  ],
  "trend": [
    [
      "2026-02-25T09:00:00.000Z",
      56
    ],
    [
      "2026-02-25T14:00:00.000Z",
      64
    ],
    [
      "2026-02-26T02:00:00.000Z",
      53
    ],
    [
      "2026-02-26T14:00:00.000Z",
      68
    ],
    [
      "2026-02-27T02:00:00.000Z",
      54
    ],
    [
      "2026-02-27T14:00:00.000Z",
      70
    ],
    [
      "2026-02-28T02:00:00.000Z",
      55
    ],
    [
      "2026-02-28T14:00:00.000Z",
      66
    ],
    [
      "2026-03-01T02:00:00.000Z",
      54
    ],
    [
      "2026-03-01T14:00:00.000Z",
      64
    ],
    [
      "2026-03-02T02:00:00.000Z",
      51
    ],
    [
      "2026-03-02T14:00:00.000Z",
      64
    ],
    [
      "2026-03-03T02:00:00.000Z",
      51
    ],
    [
      "2026-03-03T14:00:00.000Z",
      66
    ]
  ],
  "generated": "2026-02-25T13:00:52.094Z",
  "raw_forecast": {
    "@context": [
      "https://geojson.org/geojson-ld/geojson-context.jsonld",
      {
        "@version": "1.1",
        "wx": "https://api.weather.gov/ontology#",
        "geo": "http://www.opengis.net/ont/geosparql#",
        "unit": "http://codes.wmo.int/common/unit/",
        "@vocab": "https://api.weather.gov/ontology#"
      }
    ],
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -122.3931,
            37.7639
          ],
          [
            -122.3987,
            37.7857
          ],
          [
            -122.4263,
            37.7812
          ],
          [
            -122.4207,
            37.7594
          ],
          [
            -122.3931,
            37.7639
          ]
        ]
      ]
    },
    "properties": {
      "units": "us",
      "forecastGenerator": "BaselineForecastGenerator",
      "generatedAt": "2026-02-25T09:52:41+00:00",
      "updateTime": "2026-02-25T08:26:26+00:00",
      "validTimes": "2026-02-25T02:00:00+00:00/P7DT23H",
      "elevation": {
        "unitCode": "wmoUnit:m",
        "value": 39.9288
      },
      "periods": [
        {
          "number": 1,
          "name": "Overnight",
          "startTime": "2026-02-25T01:00:00-08:00",
          "endTime": "2026-02-25T06:00:00-08:00",
          "isDaytime": false,
          "temperature": 56,
          "temperatureUnit": "F",
          "temperatureTrend": null,
          "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": 56
          },
          "windSpeed": "7 mph",
          "windDirection": "SSW",
          "icon": "https://api.weather.gov/icons/land/night/rain,60?size=medium",
          "shortForecast": "Light Rain Likely",
          "detailedForecast": "Rain likely. Cloudy, with a low around 56. South southwest wind around 7 mph. Chance of precipitation is 60%. New rainfall amounts less than a tenth of an inch possible."
        },
        {
          "number": 2,
          "name": "Wednesday",
          "startTime": "2026-02-25T06:00:00-08:00",
          "endTime": "2026-02-25T18:00:00-08:00",
          "isDaytime": true,
          "temperature": 64,
          "temperatureUnit": "F",
          "temperatureTrend": null,
          "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": 12
          },
          "windSpeed": "2 to 6 mph",
          "windDirection": "WSW",
          "icon": "https://api.weather.gov/icons/land/day/bkn?size=medium",
          "shortForecast": "Mostly Cloudy",
          "detailedForecast": "Mostly cloudy. High near 64, with temperatures falling to around 61 in the afternoon. West southwest wind 2 to 6 mph."
        },
        {
          "number": 3,
          "name": "Wednesday Night",
          "startTime": "2026-02-25T18:00:00-08:00",
          "endTime": "2026-02-26T06:00:00-08:00",
          "isDaytime": false,
          "temperature": 53,
          "temperatureUnit": "F",
          "temperatureTrend": null,
          "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": 10
          },
          "windSpeed": "5 mph",
          "windDirection": "NW",
          "icon": "https://api.weather.gov/icons/land/night/bkn/fog?size=medium",
          "shortForecast": "Mostly Cloudy then Patchy Fog",
          "detailedForecast": "Patchy fog between 3am and 5am. Mostly cloudy, with a low around 53. Northwest wind around 5 mph."
        },
        {
          "number": 4,
          "name": "Thursday",
          "startTime": "2026-02-26T06:00:00-08:00",
          "endTime": "2026-02-26T18:00:00-08:00",
          "isDaytime": true,
          "temperature": 68,
          "temperatureUnit": "F",
          "temperatureTrend": null,
          "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": 0
          },
          "windSpeed": "2 to 6 mph",
          "windDirection": "N",
          "icon": "https://api.weather.gov/icons/land/day/sct?size=medium",
          "shortForecast": "Mostly Sunny",
          "detailedForecast": "Mostly sunny, with a high near 68. North wind 2 to 6 mph."
        },
        {
          "number": 5,
          "name": "Thursday Night",
          "startTime": "2026-02-26T18:00:00-08:00",
          "endTime": "2026-02-27T06:00:00-08:00",
          "isDaytime": false,
          "temperature": 54,
          "temperatureUnit": "F",
          "temperatureTrend": null,
          "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": 0
          },
          "windSpeed": "2 to 6 mph",
          "windDirection": "NNW",
          "icon": "https://api.weather.gov/icons/land/night/sct?size=medium",
          "shortForecast": "Partly Cloudy",
          "detailedForecast": "Partly cloudy, with a low around 54. North northwest wind 2 to 6 mph."
        },
        {
          "number": 6,
          "name": "Friday",
          "startTime": "2026-02-27T06:00:00-08:00",
          "endTime": "2026-02-27T18:00:00-08:00",
          "isDaytime": true,
          "temperature": 70,
          "temperatureUnit": "F",
          "temperatureTrend": null,
          "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": 0
          },
          "windSpeed": "2 to 6 mph",
          "windDirection": "NNE",
          "icon": "https://api.weather.gov/icons/land/day/bkn?size=medium",
          "shortForecast": "Partly Sunny",
          "detailedForecast": "Partly sunny, with a high near 70."
        },
        {
          "number": 7,
          "name": "Friday Night",
          "startTime": "2026-02-27T18:00:00-08:00",
          "endTime": "2026-02-28T06:00:00-08:00",
          "isDaytime": false,
          "temperature": 55,
          "temperatureUnit": "F",
          "temperatureTrend": null,
          "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": 3
          },
          "windSpeed": "2 to 6 mph",
          "windDirection": "N",
          "icon": "https://api.weather.gov/icons/land/night/bkn?size=medium",
          "shortForecast": "Mostly Cloudy",
          "detailedForecast": "Mostly cloudy, with a low around 55."
        },
        {
          "number": 8,
          "name": "Saturday",
          "startTime": "2026-02-28T06:00:00-08:00",
          "endTime": "2026-02-28T18:00:00-08:00",
          "isDaytime": true,
          "temperature": 66,
          "temperatureUnit": "F",
          "temperatureTrend": null,
          "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": 7
          },
          "windSpeed": "2 to 7 mph",
          "windDirection": "WSW",
          "icon": "https://api.weather.gov/icons/land/day/bkn?size=medium",
          "shortForecast": "Partly Sunny",
          "detailedForecast": "Partly sunny, with a high near 66."
        },
        {
          "number": 9,
          "name": "Saturday Night",
          "startTime": "2026-02-28T18:00:00-08:00",
          "endTime": "2026-03-01T06:00:00-08:00",
          "isDaytime": false,
          "temperature": 54,
          "temperatureUnit": "F",
          "temperatureTrend": null,
          "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": 7
          },
          "windSpeed": "3 to 7 mph",
          "windDirection": "WSW",
          "icon": "https://api.weather.gov/icons/land/night/bkn?size=medium",
          "shortForecast": "Mostly Cloudy",
          "detailedForecast": "Mostly cloudy, with a low around 54."
        },
        {
          "number": 10,
          "name": "Sunday",
          "startTime": "2026-03-01T06:00:00-08:00",
          "endTime": "2026-03-01T18:00:00-08:00",
          "isDaytime": true,
          "temperature": 64,
          "temperatureUnit": "F",
          "temperatureTrend": null,
          "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": 20
          },
          "windSpeed": "3 to 8 mph",
          "windDirection": "W",
          "icon": "https://api.weather.gov/icons/land/day/bkn/rain,20?size=medium",
          "shortForecast": "Partly Sunny then Slight Chance Light Rain",
          "detailedForecast": "A slight chance of rain after 4pm. Partly sunny, with a high near 64."
        },
        {
          "number": 11,
          "name": "Sunday Night",
          "startTime": "2026-03-01T18:00:00-08:00",
          "endTime": "2026-03-02T06:00:00-08:00",
          "isDaytime": false,
          "temperature": 51,
          "temperatureUnit": "F",
          "temperatureTrend": null,
          "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": 20
          },
          "windSpeed": "5 to 8 mph",
          "windDirection": "WNW",
          "icon": "https://api.weather.gov/icons/land/night/rain,20?size=medium",
          "shortForecast": "Slight Chance Light Rain",
          "detailedForecast": "A slight chance of rain before 4am. Partly cloudy, with a low around 51."
        },
        {
          "number": 12,
          "name": "Monday",
          "startTime": "2026-03-02T06:00:00-08:00",
          "endTime": "2026-03-02T18:00:00-08:00",
          "isDaytime": true,
          "temperature": 64,
          "temperatureUnit": "F",
          "temperatureTrend": null,
          "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": 12
          },
          "windSpeed": "3 to 8 mph",
          "windDirection": "WNW",
          "icon": "https://api.weather.gov/icons/land/day/sct?size=medium",
          "shortForecast": "Mostly Sunny",
          "detailedForecast": "Mostly sunny, with a high near 64."
        },
        {
          "number": 13,
          "name": "Monday Night",
          "startTime": "2026-03-02T18:00:00-08:00",
          "endTime": "2026-03-03T06:00:00-08:00",
          "isDaytime": false,
          "temperature": 51,
          "temperatureUnit": "F",
          "temperatureTrend": null,
          "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": 4
          },
          "windSpeed": "5 to 8 mph",
          "windDirection": "WSW",
          "icon": "https://api.weather.gov/icons/land/night/few?size=medium",
          "shortForecast": "Mostly Clear",
          "detailedForecast": "Mostly clear, with a low around 51."
        },
        {
          "number": 14,
          "name": "Tuesday",
          "startTime": "2026-03-03T06:00:00-08:00",
          "endTime": "2026-03-03T18:00:00-08:00",
          "isDaytime": true,
          "temperature": 66,
          "temperatureUnit": "F",
          "temperatureTrend": null,
          "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": 1
          },
          "windSpeed": "3 to 7 mph",
          "windDirection": "SW",
          "icon": "https://api.weather.gov/icons/land/day/sct?size=medium",
          "shortForecast": "Mostly Sunny",
          "detailedForecast": "Mostly sunny, with a high near 66."
        }
      ],
      "area": {
        "city": "Daly City",
        "state": "CA",
        "distance": {
          "unitCode": "wmoUnit:m",
          "value": 9148.5616793594
        },
        "bearing": {
          "unitCode": "wmoUnit:degree_(angle)",
          "value": 25
        }
      }
    }
  }
}
```
