const axios = require('axios').default;

class Api {
	constructor() {
		this.key = 'cddaa27d924b1fe838386ed5cc22fde2';
		this.pattern = 'https://api.openweathermap.org/data/2.5/weather?';
	}

	async getResponse(response) {

		const apiResponse = await axios.request(this.pattern + response + this.key);
		return apiResponse.data;
	}

	async getCity(city) {
		return await Promise.all(city.map(city => {
			const response = `q=${city.name}&appid=`;
			return this.getResponse(response);
		}));
	}
}

module.exports = Api;