const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const weatherRoute = require('./routes/weather');

async function start () {
	try {
		await mongoose.connect('mongodb+srv://sonya_nov:stich8614@cluster0.4tb7y.mongodb.net/favorites', {
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		}, console.log("connent"))
		app.listen(3000, () => {
		console.log('Server started')
		})
	} catch (e) {
		console.log(e);
	}
}
start();
app.use(cors());
app.use('', weatherRoute);