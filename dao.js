const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
  name: {
	type: String,
	required: true,
  },
  coord: {
	latitude: {
  	  type: Number,
	  required: true,
	},
	lontitude:{
	  type: Number,
	  required: true,
	}
  }
});

const city = mongoose.model('cities', Schema);

class Dao {

  async contain(response){
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
  	const result = true
	if(await this.contain(response)){
	  result = false
	  return result
	} 
	else{
	  city.create({
		name: response.name,
		coord: {
		  latitude: response.coord.lat,
		  lontitude: response.coord.lon
		}
	  })
	  return result
	}
  }

  async remove(cityName) {
	await city.findOneAndRemove({name: cityName});
  }

  find() {
	return city.find({})
  }
}

module.exports = Dao;