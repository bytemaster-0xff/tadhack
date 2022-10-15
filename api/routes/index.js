var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

/* GET home page. */
router.get('/', async function (req, res, next) {
  await client.connect();
  console.log('Connected successfully to server - inserting document');
  const db = client.db("playground");
  const collection = db.collection('documents');

  await collection.insertOne({ 'phone': '7274550530', 'name': 'Kevin Wolf', 'city': 'Tampa', 'state': 'FL' });
  console.log('inserted document')
  res.render('index', { title: 'IVR - Portal' });
  client.close();
});

router.get('/dataload/floodzones', async function (req, res, next) {
  await client.connect();
  console.log('Connected successfully to server - inserting zone document');
  const db = client.db("playground");
  const collection = db.collection('documents');

  const documents = [
    { 'phone': '3525592559', 'name': 'GV: James', 'county': 'Pinellas', 'city': 'Palm Harbor', 'state': 'FL', 'zone': 'D' },
    { 'phone': '8134443963', 'name': 'GV: Kelvin', 'county': 'Hillsborough', 'city': 'Tampa', 'state': 'FL', 'zone': 'A' },
    { 'phone': '8502125744', 'name': 'Kelvin', 'county': 'Hillsborough', 'city': 'Tampa', 'state': 'FL', 'zone': 'A' },
    { 'phone': '8138385225', 'name': 'Roberto', 'county': 'Hillsborough', 'city': 'Tampa', 'state': 'FL', 'zone': 'C' },
    { 'phone': '9413762708', 'name': 'Tamina', 'county': 'Hillsborough', 'city': 'Tampa', 'state': 'FL', 'zone': 'E' },
    { 'phone': '7274550530', 'name': 'Kevin', 'county': 'Hillsborough', 'city': 'Tampa', 'state': 'FL', 'zone': 'B' },
    { 'phone': '8137897306', 'name': 'Josh', 'county': 'Sarasota', 'city': 'Sarasota', 'state': 'FL', 'zone': 'E' },
    { 'phone': '2013209960', 'name': 'James', 'county': 'Pinellas', 'city': 'Palm Harbor', 'state': 'FL', 'zone': 'D' },
  ];

  let insertedCount = 0;
  documents.forEach(async (document, i) => {
    try {
      await collection.insertOne(document);
      insertedCount++; 
    } catch (error) {
      console.log('ERROR! Could not insert document:', document);
    }
  });

  console.log(`OPERATION STATUS:`, `inserted ${insertedCount} document${insertedCount === 1 ? '' : 's'}`);
  
  res.render('index', { title: 'IVR - Portal' });
  client.close();
});

module.exports = router;
