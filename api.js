const axios = require('axios').default;
require('dotenv').config({ path: '.env' });

class Api {
	constructor() {
		this.key = process.env.KEY;
		this.pattern = process.env.PATTERN;
	}
	convertDeg(deg) {
	  if (deg <= 21 || deg >= 337) { deg = 'North'; }
	  if (deg > 21 && deg < 66) { deg = 'North-East'; }
	  if (deg >= 66 && deg < 112) { deg = 'East'; }
	  if (deg >= 112 && deg < 156) { deg = 'South-East'; }
	  if (deg >= 156 && deg < 200) { deg = 'South'; }
	  if (deg >= 200 && deg < 247) { deg = 'South-West'; }
	  if (deg >= 247 && deg < 280) { deg = 'West'; }
	  if (deg >= 280 && deg < 337) { deg = 'North-West'; }

	  return deg;
	}

	convertData(data) {
		return {
			name: data.name, 
			coord: {
				lon: data.coord.lon, 
				lat: data.coord.lat
			},
			temp: `${Math.round(data.main.temp)}°C`,
			pressure: data.main.pressure, 
			humidity: data.main.humidity,
			description: data.weather.description,
			wind: `${data.wind.speed} m/s, ${this.convertDeg(data.wind.deg)}`
		}
	}

	async getResponse(response) {

		const apiResponse = await axios.request(this.pattern + response + this.key + `&units=metric`);
		return await this.convertData(apiResponse.data);
	}

	async getCity(city) {
		return await Promise.all(city.map(city => {
			const response = `q=${city.name}&appid=`;
			return this.getResponse(response);
		}));
	}
}

module.exports = Api;