const express = require('express');
const router = express.Router();
const daoClass = require('../dao');
const dao = new daoClass();
const apiClass = require('../api');
const apiRequest = new apiClass();

router.get('/weather/city', async (req, res) => {

	if(!req.query.q)
		res.status(404);
	else {
		const response = `q=${req.query.q}&appid=`;
		const apiResponse = await apiRequest.getResponse(response);
		res.send(apiResponse);
	}
})

router.get('/weather/coordinates', async (req, res) => {
	if(!req.query.lat && !req.query.lon)
		res.status(404);
	else {
		const response = `lat=${req.query.lat}&lon=${req.query.lon}&appid=`;
		const apiResponse = await apiRequest.getResponse(response);
		res.json(apiResponse);
	}
})

router.get('/favorites', async (req, res) => {

	const favorites = await dao.find();
	const favCity = await apiRequest.getCity(favorites);
	res.json(favCity).send();
})

router.post('/favorites', async (req, res) => {
	if(!req.query.q)
		res.status(404);
	else {
		const response = `q=${req.query.q}&appid=`;
		const apiResponse = await apiRequest.getResponse(response);
		const favCity = await dao.create(apiResponse);
		res.json(apiResponse);
	}
})

router.delete('/favorites', async (req, res) => {
	if(!req.query.q)
		res.status(404);
	else {
		
		await dao.remove(req.query.q);
		res.status(204).send();
	}
})

module.exports = router;
