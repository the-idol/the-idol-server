const express = require("express");
const { ObjectId } = require("mongodb");
const dbo = require("../db/conn");

const recordRoutes = express.Router();

// READ
recordRoutes.route("/idol").get((req, res) => {
  let dbConnect = dbo.getDb();

  dbConnect
    .collection("idols")
    .find({})
    .toArray((err, result) => {
      if (err) {
        res.status(400).send("Error fetcing idol!");
      } else {
        res.json(result);
      }
    });
});

// READ
recordRoutes.route("/idol/:id").get((req, res) => {
  let dbConnection = dbo.getDb();
  let query = { _id: ObjectId(req.params.id) };

  dbConnection
    .collection("idols")
    .findOne(query, (err, result) => {
      if (err) {
        res.status(400).send("Error fetcing idol!");
      } else {
        res.json(result);
      }
    });
});


// CREATE
recordRoutes.route("/idol").post((req, res) => {
  let dbConnect = dbo.getDb();
  let idol = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  };

  dbConnect
    .collection("idols")
    .insertOne(idol, (err, result) => {
      if (err) {
        res.status(400).send("Error inserting idol!");
      } else {
        res.json(result);
      }
    });
});

// UPDATE
recordRoutes.route("/idol").put((req, res) => {
  let dbConnect = dbo.getDb();
  let query = { _id: ObjectId(req.body._id) };
  let idol = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };

  dbConnect
    .collection("idols")
    .updateOne(query, idol, (err, result) => {
      if (err) {
        res.status(400).send("Error updating idol!");
      } else {
        res.json(result);
      }
    });
});

module.exports = recordRoutes;
