"use strict";

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (error, db) => {
  if (error) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw error;
  }

  // ==> We have a connection to the "test-tweets" db,
  //     starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  db.collection("tweets").find().toArray((error, results) => {
    if (error) throw error;

    console.log("Results Array: ", results);

    db.close();
  });
});