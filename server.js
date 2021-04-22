const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const weatherRoute = require('./routes/weather');
const favoritesRoute = require('./routes/favorites');
require('dotenv').config({ path: '.env' });
const port = process.env.PORT || 3000;

app.use(cors());
app.use('', weatherRoute);
app.use('', favoritesRoute);

const server = app.listen(port, async(err, req, res, next) =>{
  await mongoose.connect(`${process.env.DB_CONNECT}`, {
    useNewUrlParser: true,
  	useFindAndModify: false,
  	useUnifiedTopology: true
  }, console.log("connent"));

  if (err) {
    console.error(err.stack);
    res.status(500).send("Server failed!");
    return;
  }

  console.log("Server started");
})

