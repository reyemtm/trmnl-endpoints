//type def for city object

/**
 * @typedef {Object} City
 * @property {string} name - The name of the city
 * @property {string} country - The country where the city is located
 * @property {number} lat - The latitude coordinate of the city
 * @property {number} lng - The longitude coordinate of the city
 * @property {string} timeZone - The IANA time zone identifier for the city
 * @property {string} drink - The signature drink associated with the city
 */

/**
 * Generates an array of city objects with time zone and signature drink information for 5 o'clock celebrations around the world.
 * @returns {Array<City>} An array of city objects with the following properties:
 *   - {string} name - The name of the city
 *   - {string} country - The country where the city is located
 *   - {number} lat - The latitude coordinate of the city
 *   - {number} lng - The longitude coordinate of the city
 *   - {string} timeZone - The IANA time zone identifier for the city
 *   - {string} drink - The signature drink associated with the city
 */
export default function generateCities() {
  return ({
    drinks: [
      { name: "Absolut Vodka", category: "spirit", ingredients: ["vodka"] },
      { name: "Aguardiente", category: "spirit", ingredients: ["anise-flavored cane spirit"] },
      { name: "Aperol Spritz", category: "cocktail", ingredients: ["Aperol", "prosecco", "soda water"] },
      { name: "Aquavit", category: "spirit", ingredients: ["caraway or dill flavored spirit"] },
      { name: "Arabic Coffee", category: "coffee", ingredients: ["arabica coffee", "cardamom"] },
      { name: "Aussie Lager", category: "beer", ingredients: ["lager beer"] },
      { name: "Brahma", category: "beer", ingredients: ["lager beer"] },
      { name: "Brennivín", category: "spirit", ingredients: ["caraway schnapps"] },
      { name: "Caesar", category: "cocktail", ingredients: ["vodka", "clamato", "hot sauce", "worcestershire"] },
      { name: "Caeser", category: "cocktail", ingredients: ["vodka", "clamato", "hot sauce", "worcestershire"] },
      { name: "Caipirinha", category: "cocktail", ingredients: ["cachaça", "lime", "sugar"] },
      { name: "Carlsberg", category: "beer", ingredients: ["pilsner beer"] },
      { name: "Castle Lager", category: "beer", ingredients: ["lager beer"] },
      { name: "Chang", category: "beer", ingredients: ["lager beer"] },
      { name: "Coconut Toddy", category: "fermented", ingredients: ["fermented coconut palm sap"] },
      { name: "Coconut Water", category: "non-alcoholic", ingredients: ["coconut water"] },
      { name: "Cosmopolitan", category: "cocktail", ingredients: ["vodka", "triple sec", "cranberry juice", "lime"] },
      { name: "Denver Microbrew", category: "beer", ingredients: ["craft beer"] },
      { name: "Doogh", category: "non-alcoholic", ingredients: ["yogurt", "water", "mint", "salt"] },
      { name: "Egri Bikavér", category: "wine", ingredients: ["red wine blend"] },
      { name: "Fernet y Coca", category: "highball", ingredients: ["fernet", "cola"] },
      { name: "Gin and Tonic", category: "highball", ingredients: ["gin", "tonic water", "lime"] },
      { name: "Green Tea", category: "tea", ingredients: ["green tea"] },
      { name: "Guinness", category: "beer", ingredients: ["dry stout"] },
      { name: "Heineken", category: "beer", ingredients: ["lager beer"] },
      { name: "Highball", category: "highball", ingredients: ["whisky", "soda water"] },
      { name: "Hinano Beer", category: "beer", ingredients: ["lager beer"] },
      { name: "Hurricane", category: "cocktail", ingredients: ["dark rum", "light rum", "passion fruit", "citrus"] },
      { name: "Iceberg Beer", category: "beer", ingredients: ["lager beer"] },
      { name: "Ikale Ale", category: "beer", ingredients: ["ale beer"] },
      { name: "Irish Coffee", category: "coffee cocktail", ingredients: ["irish whiskey", "coffee", "sugar", "cream"] },
      { name: "Kava", category: "traditional", ingredients: ["kava root", "water"] },
      { name: "Kingfisher", category: "beer", ingredients: ["lager beer"] },
      { name: "Koskenkorva", category: "spirit", ingredients: ["vodka"] },
      { name: "Lager", category: "beer", ingredients: ["lager beer"] },
      { name: "Local IPA", category: "beer", ingredients: ["india pale ale"] },
      { name: "Mai Tai", category: "cocktail", ingredients: ["rum", "orange curaçao", "lime", "orgeat"] },
      { name: "Margarita", category: "cocktail", ingredients: ["tequila", "lime juice", "orange liqueur"] },
      { name: "Mekong Whisky", category: "spirit", ingredients: ["thai cane-and-rice spirit"] },
      { name: "Moroccan Tea", category: "tea", ingredients: ["green tea", "mint", "sugar"] },
      { name: "Myanmar Beer", category: "beer", ingredients: ["lager beer"] },
      { name: "NT Draught", category: "beer", ingredients: ["draught lager"] },
      { name: "Number One Beer", category: "beer", ingredients: ["lager beer"] },
      { name: "Old Fashioned", category: "cocktail", ingredients: ["bourbon or rye", "sugar", "bitters", "orange peel"] },
      { name: "Ouzo", category: "spirit", ingredients: ["anise spirit"] },
      { name: "Paloma", category: "cocktail", ingredients: ["tequila", "grapefruit soda", "lime"] },
      { name: "Pastis", category: "spirit", ingredients: ["anise spirit", "water"] },
      { name: "Pilsner", category: "beer", ingredients: ["pilsner beer"] },
      { name: "Pilsner Urquell", category: "beer", ingredients: ["pilsner beer"] },
      { name: "Pinot Noir", category: "wine", ingredients: ["pinot noir wine"] },
      { name: "Pint of Ale", category: "beer", ingredients: ["ale beer"] },
      { name: "Pisco", category: "spirit", ingredients: ["grape brandy"] },
      { name: "Pisco Sour", category: "cocktail", ingredients: ["pisco", "lime", "sugar", "egg white", "bitters"] },
      { name: "Primus", category: "beer", ingredients: ["lager beer"] },
      { name: "Raki", category: "spirit", ingredients: ["anise spirit"] },
      { name: "Raksi", category: "spirit", ingredients: ["distilled grain spirit"] },
      { name: "Sam Adams", category: "beer", ingredients: ["lager beer"] },
      { name: "Sang Som", category: "spirit", ingredients: ["thai rum"] },
      { name: "Seattle Coffee", category: "coffee", ingredients: ["brewed coffee"] },
      { name: "Soju", category: "spirit", ingredients: ["distilled rice/barley spirit"] },
      { name: "Sparkling Wine", category: "wine", ingredients: ["sparkling wine"] },
      { name: "Speight's", category: "beer", ingredients: ["ale/lager beer"] },
      { name: "Stella", category: "beer", ingredients: ["lager beer"] },
      { name: "Tecate", category: "beer", ingredients: ["lager beer"] },
      { name: "Texas Whiskey", category: "spirit", ingredients: ["whiskey"] },
      { name: "Tiger Beer", category: "beer", ingredients: ["lager beer"] },
      { name: "Tinto de Verano", category: "wine cocktail", ingredients: ["red wine", "lemon soda"] },
      { name: "Toddy", category: "fermented", ingredients: ["fermented palm sap"] },
      { name: "Tsing Tao", category: "beer", ingredients: ["lager beer"] },
      { name: "Tusker", category: "beer", ingredients: ["lager beer"] },
      { name: "VB", category: "beer", ingredients: ["lager beer"] },
      { name: "Verdelho Wine", category: "wine", ingredients: ["verdelho wine"] },
      { name: "Vermouth", category: "fortified wine", ingredients: ["aromatized fortified wine"] },
      { name: "Vinho Verde", category: "wine", ingredients: ["young portuguese wine"] },
      { name: "Vodka", category: "spirit", ingredients: ["vodka"] },
      { name: "Wiener Melange", category: "coffee", ingredients: ["espresso", "steamed milk", "foam"] },
      { name: "Żubrówka", category: "spirit", ingredients: ["bison grass flavored vodka"] }
    ],
    cities: [
      {
        name: "Dublin",
        country: "Ireland",
        lat: 53.3498,
        lng: -6.2603,
        timeZone: "Europe/Dublin",
        drink: "Guinness"
      },
      {
        name: "Tokyo",
        country: "Japan",
        lat: 35.6762,
        lng: 139.6503,
        timeZone: "Asia/Tokyo",
        drink: "Highball"
      },
      {
        name: "New Orleans",
        country: "USA",
        lat: 29.9511,
        lng: -90.2623,
        timeZone: "America/Chicago",
        drink: "Hurricane"
      },
      {
        name: "Rio de Janeiro",
        country: "Brazil",
        lat: -22.9068,
        lng: -43.1729,
        timeZone: "America/Sao_Paulo",
        drink: "Caipirinha"
      },
      {
        name: "Barcelona",
        country: "Spain",
        lat: 41.3874,
        lng: 2.1686,
        timeZone: "Europe/Madrid",
        drink: "Vermouth"
      },
      {
        name: "Miami",
        country: "USA",
        lat: 25.7617,
        lng: -80.1918,
        timeZone: "America/New_York",
        drink: "Mojito"
      },
      {
        name: "Bangkok",
        country: "Thailand",
        lat: 13.7563,
        lng: 100.5018,
        timeZone: "Asia/Bangkok",
        drink: "Sang Som"
      },
      {
        name: "Las Vegas",
        country: "USA",
        lat: 36.1699,
        lng: -115.1398,
        timeZone: "America/Los_Angeles",
        drink: "Margarita"
      },
      {
        name: "Amsterdam",
        country: "Netherlands",
        lat: 52.3676,
        lng: 4.9041,
        timeZone: "Europe/Amsterdam",
        drink: "Heineken"
      },
      {
        name: "Cancún",
        country: "Mexico",
        lat: 21.1629,
        lng: -86.8515,
        timeZone: "America/Mexico_City",
        drink: "Paloma"
      },
      {
        name: "Sydney",
        country: "Australia",
        lat: -33.8688,
        lng: 151.2093,
        timeZone: "Australia/Sydney",
        drink: "Aussie Lager"
      },
      {
        name: "London",
        country: "UK",
        lat: 51.5074,
        lng: -0.1278,
        timeZone: "Europe/London",
        drink: "Pint of Ale"
      },
      {
        name: "Paris",
        country: "France",
        lat: 48.8566,
        lng: 2.3522,
        timeZone: "Europe/Paris",
        drink: "Pastis"
      },
      {
        name: "Berlin",
        country: "Germany",
        lat: 52.5200,
        lng: 13.4050,
        timeZone: "Europe/Berlin",
        drink: "Pilsner"
      },
      {
        name: "Rome",
        country: "Italy",
        lat: 41.9028,
        lng: 12.4964,
        timeZone: "Europe/Rome",
        drink: "Aperol Spritz"
      },
      {
        name: "Madrid",
        country: "Spain",
        lat: 40.4168,
        lng: -3.7038,
        timeZone: "Europe/Madrid",
        drink: "Tinto de Verano"
      },
      {
        name: "Moscow",
        country: "Russia",
        lat: 55.7558,
        lng: 37.6173,
        timeZone: "Europe/Moscow",
        drink: "Vodka"
      },
      {
        name: "Dubai",
        country: "UAE",
        lat: 25.2048,
        lng: 55.2708,
        timeZone: "Asia/Dubai",
        drink: "Arabic Coffee"
      },
      {
        name: "Singapore",
        country: "Singapore",
        lat: 1.3521,
        lng: 103.8198,
        timeZone: "Asia/Singapore",
        drink: "Tiger Beer"
      },
      {
        name: "Hong Kong",
        country: "Hong Kong",
        lat: 22.3193,
        lng: 114.1694,
        timeZone: "Asia/Hong_Kong",
        drink: "Tsing Tao"
      },
      {
        name: "Seoul",
        country: "South Korea",
        lat: 37.5665,
        lng: 126.9780,
        timeZone: "Asia/Seoul",
        drink: "Soju"
      },
      {
        name: "Bangkok",
        country: "Thailand",
        lat: 13.7563,
        lng: 100.5018,
        timeZone: "Asia/Bangkok",
        drink: "Sang Som"
      },
      {
        name: "Mumbai",
        country: "India",
        lat: 19.0760,
        lng: 72.8777,
        timeZone: "Asia/Kolkata",
        drink: "Kingfisher"
      },
      {
        name: "Delhi",
        country: "India",
        lat: 28.7041,
        lng: 77.1025,
        timeZone: "Asia/Kolkata",
        drink: "Kingfisher"
      },
      {
        name: "Istanbul",
        country: "Turkey",
        lat: 41.0082,
        lng: 28.9784,
        timeZone: "Europe/Istanbul",
        drink: "Raki"
      },
      {
        name: "Cairo",
        country: "Egypt",
        lat: 30.0444,
        lng: 31.2357,
        timeZone: "Africa/Cairo",
        drink: "Stella"
      },
      {
        name: "Johannesburg",
        country: "South Africa",
        lat: -26.2023,
        lng: 28.0436,
        timeZone: "Africa/Johannesburg",
        drink: "Castle Lager"
      },
      {
        name: "Cape Town",
        country: "South Africa",
        lat: -33.9249,
        lng: 18.4241,
        timeZone: "Africa/Johannesburg",
        drink: "Primus"
      },
      {
        name: "Marrakech",
        country: "Morocco",
        lat: 31.6295,
        lng: -7.9811,
        timeZone: "Africa/Casablanca",
        drink: "Moroccan Tea"
      },
      {
        name: "Mexico City",
        country: "Mexico",
        lat: 19.4326,
        lng: -99.1332,
        timeZone: "America/Mexico_City",
        drink: "Tecate"
      },
      {
        name: "São Paulo",
        country: "Brazil",
        lat: -23.5505,
        lng: -46.6333,
        timeZone: "America/Sao_Paulo",
        drink: "Brahma"
      },
      {
        name: "Buenos Aires",
        country: "Argentina",
        lat: -34.6037,
        lng: -58.3816,
        timeZone: "America/Argentina/Buenos_Aires",
        drink: "Fernet y Coca"
      },
      {
        name: "Lima",
        country: "Peru",
        lat: -12.0464,
        lng: -77.0428,
        timeZone: "America/Lima",
        drink: "Pisco Sour"
      },
      {
        name: "Bogotá",
        country: "Colombia",
        lat: 4.7110,
        lng: -74.0721,
        timeZone: "America/Bogota",
        drink: "Aguardiente"
      },
      {
        name: "Santiago",
        country: "Chile",
        lat: -33.8688,
        lng: -51.2093,
        timeZone: "America/Santiago",
        drink: "Pisco"
      },
      {
        name: "Toronto",
        country: "Canada",
        lat: 43.6532,
        lng: -79.3832,
        timeZone: "America/Toronto",
        drink: "Caeser"
      },
      {
        name: "Vancouver",
        country: "Canada",
        lat: 49.2827,
        lng: -123.1207,
        timeZone: "America/Vancouver",
        drink: "Local IPA"
      },
      {
        name: "New York",
        country: "USA",
        lat: 40.7128,
        lng: -74.0060,
        timeZone: "America/New_York",
        drink: "Cosmopolitan"
      },
      {
        name: "Los Angeles",
        country: "USA",
        lat: 34.0522,
        lng: -118.2437,
        timeZone: "America/Los_Angeles",
        drink: "Margarita"
      },
      {
        name: "San Francisco",
        country: "USA",
        lat: 37.7749,
        lng: -122.4194,
        timeZone: "America/Los_Angeles",
        drink: "Irish Coffee"
      },
      {
        name: "Chicago",
        country: "USA",
        lat: 41.8781,
        lng: -87.6298,
        timeZone: "America/Chicago",
        drink: "Old Fashioned"
      },
      {
        name: "Seattle",
        country: "USA",
        lat: 47.6062,
        lng: -122.3321,
        timeZone: "America/Los_Angeles",
        drink: "Seattle Coffee"
      },
      {
        name: "Denver",
        country: "USA",
        lat: 39.7392,
        lng: -104.9903,
        timeZone: "America/Denver",
        drink: "Denver Microbrew"
      },
      {
        name: "Austin",
        country: "USA",
        lat: 30.2672,
        lng: -97.7431,
        timeZone: "America/Chicago",
        drink: "Texas Whiskey"
      },
      {
        name: "Boston",
        country: "USA",
        lat: 42.3601,
        lng: -71.0589,
        timeZone: "America/New_York",
        drink: "Sam Adams"
      },
      {
        name: "Melbourne",
        country: "Australia",
        lat: -37.8136,
        lng: 144.9631,
        timeZone: "Australia/Melbourne",
        drink: "VB"
      },
      {
        name: "Auckland",
        country: "New Zealand",
        lat: -37.0082,
        lng: 174.7850,
        timeZone: "Pacific/Auckland",
        drink: "Speight's"
      },
      {
        name: "Bangkok",
        country: "Thailand",
        lat: 13.7563,
        lng: 100.5018,
        timeZone: "Asia/Bangkok",
        drink: "Chang"
      },
      {
        name: "Vienna",
        country: "Austria",
        lat: 48.2082,
        lng: 16.3738,
        timeZone: "Europe/Vienna",
        drink: "Wiener Melange"
      },
      {
        name: "Prague",
        country: "Czech Republic",
        lat: 50.0755,
        lng: 14.4378,
        timeZone: "Europe/Prague",
        drink: "Pilsner Urquell"
      },
      {
        name: "Budapest",
        country: "Hungary",
        lat: 47.4979,
        lng: 19.0402,
        timeZone: "Europe/Budapest",
        drink: "Egri Bikavér"
      },
      {
        name: "Warsaw",
        country: "Poland",
        lat: 52.2297,
        lng: 21.0122,
        timeZone: "Europe/Warsaw",
        drink: "Żubrówka"
      },
      {
        name: "Athens",
        country: "Greece",
        lat: 37.9838,
        lng: 23.7275,
        timeZone: "Europe/Athens",
        drink: "Ouzo"
      },
      {
        name: "Lisbon",
        country: "Portugal",
        lat: 38.7223,
        lng: -9.1393,
        timeZone: "Europe/Lisbon",
        drink: "Vinho Verde"
      },
      {
        name: "Stockholm",
        country: "Sweden",
        lat: 59.3293,
        lng: 18.0686,
        timeZone: "Europe/Stockholm",
        drink: "Absolut Vodka"
      },
      {
        name: "Copenhagen",
        country: "Denmark",
        lat: 55.6761,
        lng: 12.5883,
        timeZone: "Europe/Copenhagen",
        drink: "Carlsberg"
      },
      {
        name: "Oslo",
        country: "Norway",
        lat: 59.9139,
        lng: 10.7522,
        timeZone: "Europe/Oslo",
        drink: "Aquavit"
      },
      {
        name: "Helsinki",
        country: "Finland",
        lat: 60.1695,
        lng: 24.9354,
        timeZone: "Europe/Helsinki",
        drink: "Koskenkorva"
      },
      {
        name: "Bangkok",
        country: "Thailand",
        lat: 13.7563,
        lng: 100.5018,
        timeZone: "Asia/Bangkok",
        drink: "Mekong Whisky"
      },
      {
        name: "Bangkok",
        country: "Thailand",
        lat: 13.7563,
        lng: 100.5018,
        timeZone: "Asia/Bangkok",
        drink: "Mekong Whisky"
      },

      // Added for full UTC offset coverage
      {
        name: "Baker Island",
        country: "US Minor Outlying Islands",
        lat: 0.1936,
        lng: -176.4769,
        timeZone: "Etc/GMT+12", // UTC-12
        drink: "Coconut Water"
      },
      {
        name: "Pago Pago",
        country: "American Samoa",
        lat: -14.2756,
        lng: -170.7020,
        timeZone: "Pacific/Pago_Pago", // UTC-11
        drink: "Kava"
      },
      {
        name: "Honolulu",
        country: "USA",
        lat: 21.3069,
        lng: -157.8583,
        timeZone: "Pacific/Honolulu", // UTC-10
        drink: "Mai Tai"
      },
      {
        name: "Taiohae",
        country: "French Polynesia",
        lat: -8.9109,
        lng: -140.0997,
        timeZone: "Pacific/Marquesas", // UTC-9:30
        drink: "Hinano Beer"
      },
      {
        name: "St. John's",
        country: "Canada",
        lat: 47.5615,
        lng: -52.7126,
        timeZone: "America/St_Johns", // UTC-3:30
        drink: "Iceberg Beer"
      },
      {
        name: "Fernando de Noronha",
        country: "Brazil",
        lat: -3.8547,
        lng: -32.4240,
        timeZone: "America/Noronha", // UTC-2
        drink: "Caipirinha"
      },
      {
        name: "Ponta Delgada",
        country: "Portugal",
        lat: 37.7412,
        lng: -25.6756,
        timeZone: "Atlantic/Azores", // UTC-1
        drink: "Verdelho Wine"
      },
      {
        name: "Reykjavík",
        country: "Iceland",
        lat: 64.1466,
        lng: -21.9426,
        timeZone: "Atlantic/Reykjavik", // UTC+0
        drink: "Brennivín"
      },
      {
        name: "Nairobi",
        country: "Kenya",
        lat: -1.2921,
        lng: 36.8219,
        timeZone: "Africa/Nairobi", // UTC+3
        drink: "Tusker"
      },
      {
        name: "Tehran",
        country: "Iran",
        lat: 35.6892,
        lng: 51.3890,
        timeZone: "Asia/Tehran", // UTC+3:30
        drink: "Doogh"
      },
      {
        name: "Kabul",
        country: "Afghanistan",
        lat: 34.5553,
        lng: 69.2075,
        timeZone: "Asia/Kabul", // UTC+4:30
        drink: "Green Tea"
      },
      {
        name: "Kathmandu",
        country: "Nepal",
        lat: 27.7172,
        lng: 85.3240,
        timeZone: "Asia/Kathmandu", // UTC+5:45
        drink: "Raksi"
      },
      {
        name: "Yangon",
        country: "Myanmar",
        lat: 16.8409,
        lng: 96.1735,
        timeZone: "Asia/Yangon", // UTC+6:30
        drink: "Myanmar Beer"
      },
      {
        name: "Eucla",
        country: "Australia",
        lat: -31.7167,
        lng: 128.8833,
        timeZone: "Australia/Eucla", // UTC+8:45
        drink: "Lager"
      },
      {
        name: "Darwin",
        country: "Australia",
        lat: -12.4634,
        lng: 130.8456,
        timeZone: "Australia/Darwin", // UTC+9:30
        drink: "NT Draught"
      },
      {
        name: "Lord Howe Island",
        country: "Australia",
        lat: -31.5520,
        lng: 159.0769,
        timeZone: "Australia/Lord_Howe", // UTC+10:30
        drink: "Sparkling Wine"
      },
      {
        name: "Nouméa",
        country: "New Caledonia",
        lat: -22.2758,
        lng: 166.4580,
        timeZone: "Pacific/Noumea", // UTC+11
        drink: "Number One Beer"
      },
      {
        name: "Tarawa",
        country: "Kiribati",
        lat: 1.4518,
        lng: 172.9717,
        timeZone: "Pacific/Tarawa", // UTC+12
        drink: "Toddy"
      },
      {
        name: "Waitangi (Chatham Islands)",
        country: "New Zealand",
        lat: -43.9535,
        lng: -176.5597,
        timeZone: "Pacific/Chatham", // UTC+12:45
        drink: "Pinot Noir"
      },
      {
        name: "Nuku'alofa",
        country: "Tonga",
        lat: -21.1394,
        lng: -175.2049,
        timeZone: "Pacific/Tongatapu", // UTC+13
        drink: "Ikale Ale"
      },
      {
        name: "Kiritimati",
        country: "Kiribati",
        lat: 1.8721,
        lng: -157.4278,
        timeZone: "Pacific/Kiritimati", // UTC+14
        drink: "Coconut Toddy"
      }
    ]
  });
}