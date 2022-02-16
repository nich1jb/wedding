const express = require('express');
const hash = require('object-hash');
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');

const api = express.Router();
const client = new SecretManagerServiceClient()

api.get('/password', (req, res) => {
  client.accessSecretVersion({
    name: "projects/765884841575/secrets/nick-zoe-wedding-password/versions/latest",
  })
  .then(function (result) {
    let secret = result[0].payload.data.toString();
    let expected = hash(secret + process.env.SALT)
    res.send((req.query.attempt === expected));
  })
});

module.exports = api;
