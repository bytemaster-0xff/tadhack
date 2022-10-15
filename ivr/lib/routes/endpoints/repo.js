const { MongoClient } = require('mongodb');
const mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

var repo = {};

repo.getUser = (async (id) => {
    console.log('getting user', id);
    await client.connect();
    const db = client.db("playground");
    const collection = db.collection('documents');
    let filteredDocs = await collection.find({ 'phone':id }).toArray();
    if(filteredDocs.length == 0) {
        console.log('add user');
        await collection.insertOne({ 'phone': id, 'created': new Date().toISOString() });
        filteredDocs = await collection.find({ 'phone':id }).toArray();
    }
    else {
        console.log('found user');
    }

    console.log(filteredDocs);
    
    client.close();
});

repo.putUser = (async (user) => {
    console.log('updating user', user);
    await client.connect();
    const db = client.db("playground");
    const collection = db.collection('documents');
    const filteredDocs = await collection.update(
        { 'phone':user.phone }, 
        {$set:user});
    console.log(filteredDocs);
    client.close();
});

module.exports = repo;