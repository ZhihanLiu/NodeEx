
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb+srv://zliu39:QWErtyu123@clustermgdb-opdll.mongodb.net/test?retryWrites=true&authSource=admin';
//mongodb+srv://zliu39:<PASSWORD>@clustermgdb-opdll.mongodb.net/test?retryWrites=true

// Use connect method to connect to the server
const dbName = 'test';
 
// Use connect method to connect to the server

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
   
    const db = client.db(dbName);
   
    insertDocuments(db, function() {
      client.close();
    });
  });
  
  const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  }
