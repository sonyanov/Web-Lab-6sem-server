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

	find() {
		return city.find({})
	}
}

module.exports = Dao;