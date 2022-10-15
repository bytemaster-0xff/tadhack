var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';

/* GET home page. */
router.get('/', async function (req, res, next) {
  const client = new MongoClient(url);
  await client.connect();
  console.log('Connected successfully to server - inserting document');
  const db = client.db("playground");
  const collection = db.collection('documents');

  await collection.insertOne({ 'phone': '7274550530', 'name': 'Kevin Wolf', 'city': 'Tampa', 'state': 'FL' });
  console.log('inserted document')
  res.render('index', { title: 'IVR - Portal' });
  client.close();
});

module.exports = router;