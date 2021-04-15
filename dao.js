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
	create(response) {
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

	findOne(city) {
		if(city.findOne({name: city})!= undefined)
			return false;
	}

	find() {
		return city.find({})
	}
}

module.exports = Dao;