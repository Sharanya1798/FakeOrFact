const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'SPE_Major';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
    assert.strictEqual(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    insertDocuments(db, function() {
        client.close();
    });
    client.close();
});
const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('login');
    // Insert some documents
    collection.insertMany([
        {"shubham" : "baby"}, {"ashu1" : "baby2"}, {"ajji2" : "baby3"}
    ], function(err, result) {
        assert.strictEqual(err, null);
        assert.strictEqual(3, result.result.n);

        assert.strictEqual(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}