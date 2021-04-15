const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const weatherRoute = require('./routes/weather');
require('dotenv').config({ path: '.env' });
const port = process.env.PORT || 3000;

async function start () {
	try {
		await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PAS}@cluster0.4tb7y.mongodb.net/favorites`, {
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		}, console.log("connent"))
		app.listen(port, () => {
		console.log("Server started")
		})
	} catch (e) {
		console.log(e);
	}
}
start();
app.use(cors());
app.use('', weatherRoute);