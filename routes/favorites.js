const express = require('express');
const router = express.Router();
const daoClass = require('../dao');
const dao = new daoClass();
const apiClass = require('../api');
const apiRequest = new apiClass();

router.get('/favorites', async (req, res) => {
  const favorites = await dao.find();
  const favCity = await apiRequest.getCity(favorites);
  res.json(favCity).send();
})

router.post('/favorites', async (req, res) => {
  if(!req.query.q){
    res.status(404);
    return;
  }

  const apiResponse = await apiRequest.getResponseByCity(req.query.q);
  const result = await dao.create(apiResponse);

  if (result === true)
    res.json(apiResponse).status(201);
  else{
    apiResponse.name = undefined;
    res.json(apiResponse)
  }
})

router.delete('/favorites', async (req, res) => {
  if(!req.query.q){
    res.status(404);
    return;
  }	
  await dao.remove(req.query.q);
  res.status(204).send();
})

module.exports = router;