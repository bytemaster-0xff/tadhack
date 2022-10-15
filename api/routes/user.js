var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

/* GET users listing. */
router.get('/:uid', async function(req, res, next) {
  await client.connect();
  console.log(req.params.uid);
  const db = client.db("playground");
  const collection = db.collection('documents');
  const filteredDocs = await collection.find({ 'phone':req.params.uid }).toArray();
  res.json(filteredDocs);
  client.close();
});

router.delete('/:id', async function(req, res, next) {
  await client.connect();
  console.log('delete user with: ', req.params.id);
  const db = client.db("playground");
  const collection = db.collection('documents');
  await collection.deleteOne({ '_id':new mongodb.ObjectID(req.params.id)});
  console.log('deleted');
  res.sendStatus(200);
  client.close();
});

module.exports = router;
