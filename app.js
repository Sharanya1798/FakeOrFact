const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
let db;
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'SPE_Major';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server

module.exports = insertDocuments;
function insertDocuments(username, password) {
    client.connect(function(err) {
        assert.strictEqual(null, err);
        console.log("Connected successfully to server");

        db = client.db(dbName);

    const loginDetails = db.collection('login');
    // Get the documents collection
    // Insert some documents
        loginDetails.insertMany([
            {username : password}, {username : password}, {username : password}
        ], function(err, result) {
            assert.strictEqual(err, null);
            assert.strictEqual(3, result.result.n);
            assert.strictEqual(3, result.ops.length);
            console.log("Inserted 3 documents into the collection");
        });
        client.close()
    });
}