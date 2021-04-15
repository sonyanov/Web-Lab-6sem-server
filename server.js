const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const weatherRoute = require('./routes/weather');
require('dotenv').config({ path: '.env' });
const port = process.env.PORT || 3000;

async function start () {
	try {
		await mongoose.connect(process.env.DB_CONNECT, {
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

console.log(process.env.DB_CONNECT)
start();
app.use(cors());
app.use('', weatherRoute);