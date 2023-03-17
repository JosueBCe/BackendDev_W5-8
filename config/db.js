const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const MongoClient = require('mongodb').MongoClient;

  const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
  const collection = client.db("ecommerce").collection("users");
  collection.updateOne(filter, update)
    .then(result => {
      console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      client.close();
    });
});

    console.log(`MongoDB Connected:`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB