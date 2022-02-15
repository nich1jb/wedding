const express = require('express');

const api = express.Router();

api.get('/password', (req, res) => {
  console.log((req.query.attempt === "the_password"));
  res.send((req.query.attempt === "the_password"));
});

module.exports = api;
