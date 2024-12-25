const express = require("express");
const app = express();
require("dotenv").config();
const bodyparser = require("body-parser");
const cors = require("cors");

const { MongoClient } = require("mongodb");

// Connection URL
const url = process.env.MONGO_URI; // Use the URL from .env
const client = new MongoClient(url);

// Database Name
const dbName = "passop";
const port = 3000;

app.use(bodyparser.json());
app.use(cors()); // Call cors() middleware

// MongoDB connection handling
let db;
client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
    db = client.db(dbName); // Store the database reference
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Get all the passwords
app.get("/", async (req, res) => {
  try {
    const collection = db.collection("passwords");
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
  } catch (err) {
    res.status(500).send({ error: "Failed to retrieve passwords" });
  }
});

// Save the passwords
app.post("/", async (req, res) => {
  try {
    const password = req.body;
    const collection = db.collection("passwords");
    const findResult = await collection.insertOne(password);
    res.send({ success: true, result: findResult });
  } catch (err) {
    res.status(500).send({ error: "Failed to save password" });
  }
});

// Delete a password
app.delete("/", async (req, res) => {
  try {
    const password = req.body;
    const collection = db.collection("passwords");
    const findResult = await collection.deleteOne(password);
    res.send({ success: true, result: findResult });
  } catch (err) {
    res.status(500).send({ error: "Failed to delete password" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
