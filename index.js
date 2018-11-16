const express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const corridaRoute = require('./routes/corrida.route');

mongoose.connect('', { useNewUrlParser: true } );

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({message: 'ok'});
  }
  next();
});

app.use('/corrida', corridaRoute);
app.use(express.static('public_html'));
app.listen(8000, () => {
  console.log('Server started!');
});
