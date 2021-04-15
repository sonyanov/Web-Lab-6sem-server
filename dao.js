const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	coord: {
		latitude: {
			type: String,
			required: true,
		},
		lontitude:{
			type: String,
			required: true,
		}
	}
});

const city = mongoose.model('cities', Schema);

class Dao {

	contain(response){
		const data = {
			coord: {
				latitude: response.coord.lat,
				lontitude: response.coord.lon
			}
		}

		let result = await city.findOne(data);
		return result !== null
	}

	async create(response) {

		if(await this.contain(response)) return 

		city.create({
			name: response.name,
			coord: {
				latitude: response.coord.lat,
				lontitude: response.coord.lon
			}
		})
	}

	async remove(cityName) {
		await city.findOneAndRemove({name: cityName});
	}

	find() {
		return city.find({})
	}
}

module.exports = Dao;