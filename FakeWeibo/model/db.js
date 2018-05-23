
var MongoClient = require('mongodb').MongoClient
, assert = require('assert');

// Connection URL
var url = 'mongodb+srv://zliu39:QWErtyu123@clustermgdb-opdll.mongodb.net/test?retryWrites=true&authSource=admin';
//mongodb+srv://zliu39:<PASSWORD>@clustermgdb-opdll.mongodb.net/test?retryWrites=true

// Use connect method to connect to the server
var dbName = 'mongodb+srv://zliu39:QWErtyu123@clustermgdb-opdll.mongodb.net/test?retryWrites=true&authSource=admin';

function connectDb( dbName, callback) {
dbName = dbName;
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
   if(err)
   {
    callback("Can not connect to DB! ", null,null);
    return;
   } 
  console.log("Connected successfully to server " +dbName);
  const db = client.db(dbName);
 
  callback("",db,client);
});

}

//target is an array
function insert (dbName,collectionName,target,callback){
connectDb(dbName,(err,db,client)=>{
  if(err)
  {
   console.log(err);
   return;
  } 
  const collection = db.collection(collectionName);
 
  collection.insertMany(target, function(err, result) {
    if(err)
    {
      console.log(err);
     callback("Can not insert to " + collectionName, null);
     return;
    } 
    callback("",result);
    client.close();
  });

});

}
//return [] if no results. 
function find (dbName,collectionName, target,callback){
if(callback == null) {
  callback = target;
  target = {};
}
connectDb(dbName,(err,db,client)=>{
if(err)
     {
      callback("Can not find " + dbName, null);
      client.close();
      return;
  } 
  const collection = db.collection(collectionName);
 
  collection.find(target).toArray(function(err, docs) {
     if(err)
     {
      callback("Can not find " + collectionName, null);
    
     } 
     callback("",docs);
      
    });
    client.close();
  });


}

module.exports ={
insert,find
};