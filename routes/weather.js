const express = require('express');
const router = express.Router();
const daoClass = require('../dao');
const dao = new daoClass();
const apiClass = require('../api');
const apiRequest = new apiClass();

router.get('/weather/city', async (req, res) => {

  if(!req.query.q){
	res.status(404);
	return
  }

  const apiResponse = await apiRequest.getResponseByCity(req.query.q);
  res.send(apiResponse);

})

router.get('/weather/coordinates', async (req, res) => {

  if(!req.query.lat || !req.query.lon){
	res.status(404);
	return
  }

  const apiResponse = await apiRequest.getResponseByCoord(req.query.lat, req.query.lon);
  res.json(apiResponse);
})

module.exports = router;
