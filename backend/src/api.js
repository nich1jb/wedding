const express = require('express');
const hash = require('object-hash');
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { sendEmail } = require("./email");

const api = express();
api.use(express.json());
const client = new SecretManagerServiceClient();
initializeApp({
  credential: applicationDefault()
});

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

api.post('/guests', function(req, res) {
  let body = req.body;
  const email = req.body.email;
  delete body.email;

  getFirestore().collection('guests').doc(email).set(body);

  res.send({
    'guest_data': req.body
  });

});

api.post('/email', (req, res) => {
  let recipient = req.body.recipient;
  sendEmail(recipient)
  res.send({
    'email_sent_to': req.body.recipient
  });
});

module.exports = api;
