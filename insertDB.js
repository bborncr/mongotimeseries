// Preallocates a one hour segment of time series data
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// MongoDB url stored in credentials.js
var url = require('./credentials.js');

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var jsonFile = require('./oneHourOfData.json');
  db.collection("timeseriesdata").insertOne(jsonFile, function(err, res) {
    if (err) throw err;
    console.log("1 record inserted");
    db.close();
  });
});