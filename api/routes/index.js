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

router.get('/dataload/floodzones', async function (req, res, next) {
  const client = new MongoClient(url);
  await client.connect();
  console.log('Connected successfully to server - inserting zone document');
  const db = client.db("playground");
  const collection = db.collection('documents');

  const documents = [
    { 'phone': '3525592550', 'name': 'Dummy: 1', 'county': 'Pinellas', 'city': 'Palm Harbor', 'state': 'FL', 'zone': 'D' },
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
  let promisesToKeep = [];
  documents.forEach((document, i) => {
    console.log('+++++++ document to insert', document);
    if (document) {
      promisesToKeep.push(collection.insertOne(document));
    }
  });
  
  let responseMessage = 'failed!';

  if (promisesToKeep.length > 0) {
    console.log('+++++++ there are promises to keep', new Date());
    try {
      await Promise.all(promisesToKeep)
      .then((responses, r) => {
        console.log(`responses`, responses);
      })
      .finally(() => {
        responseMessage = `Inserted ${insertedCount} document${insertedCount === 1 ? '' : 's'}`;
        console.log(`OPERATION STATUS:`, responseMessage);
      });
      insertedCount++;
    } catch (error) {
      console.log('ERROR INSERTING DOCUMENTS!', new Date());
    }
    finally{
      res.json({ message: responseMessage });
      client.close(); 
    }
  }
  else {
    console.log(`OPERATION STATUS:`, responseMessage);
    res.json({ message: responseMessage });
    client.close(); 
  }
});

module.exports = router;
