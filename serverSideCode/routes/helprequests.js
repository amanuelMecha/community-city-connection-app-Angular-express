const { ObjectID } = require("bson");
var express = require("express");
var router = express.Router();
const env = require("dotenv").config();
const collection = process.env.helpRequests;
const http = require("http");
const { fork } = require("child_process");
const server = http.createServer();
/* GET all helprequests. */
//http://localhost:3000/helprequests/  method GET

router.get("/", function (req, res, next) {
  req.db
    .collection(collection)
    .find()

    .toArray()
    .then((data) => {
      res.status(200).json({ status: "success", result: data });
    });
});

//get by city
router.get("/city/:skip", function (req, res, next) {
  console.log("cittttttttttttttt");
  let searchByCity;

  if (req.query.city !== "null") {
    searchByCity = req.query.city;
  } else {
    searchByCity = req.address.city;
  }

  // console.log("city", req.query, searchByCity, req.address.city);
  let skipNumber = (req.params.skip - 1) * 3;
  req.db
    .collection(collection)
    .find({
      "address.city": searchByCity,
      //   date: { $gt: new Date() },
      date: { $gt: new Date(new Date().getTime() - 1000 * 3600 * 48) },
    })
    .sort({ date: -1 })
    .skip(skipNumber)
    .limit(3)
    .toArray()
    .then((data) => {
      res.status(200).json({ status: "success", result: data });
    });
});
//get by id
router.get("/:id", function (req, res, next) {
  req.db
    .collection(collection)
    .find({ _id: ObjectID(req.params.id) })
    .toArray()
    .then((data) => {
      res.status(200).json({ status: "success", result: data });
    });
});

//post new help request
//http://localhost:3000/helprequests/  method post

router.post("/", function (req, res, next) {
 console.log("help request", req.query.changecityName);
  helprequest = {
    date: new Date(),
    request: req.body.request,
    userID: new ObjectID(),
    name: req.name,
    contact: {
      phone: req.phone,
      email: req.email,
    },
    address: {
      street: req.address.street,
      // city: req.address.city,
      city: req.query.changecityName? req.query.changecityName: req.address.city,
      state: req.address.state,
      zipcode: req.address.zipcode,
    },
    comment: [],
  };
  req.db
    .collection(collection)
    .insertOne(helprequest)
    .then((data) => {
      res.status(200).json({ status: "success", result: data });
    })
    .catch((err) => {
      res.json({ status: err });
    });
});
//add comment
//http://localhost:3000/helprequests/  method put
router.put("/:id/comments", (req, res) => {
  let payload = {
    id: new ObjectID(),
    name: req.name,
    email: req.email,
    text: req.body.text,
    reply: [],
  };
  req.db
    .collection(collection)
    .updateOne(
      { _id: ObjectID(req.params.id) },
      { $push: { comment: payload } }
    )
    .then((data) => {
      res.status(200).json({ status: "updated succesfully" });
    })
    .catch((err) => {
      res.status(400).json({ status: err });
    });
});
//add reply
//http://localhost:3000/helprequests/  method post
router.put("/:id/comments/:cid/reply", (req, res) => {
  // console.log("inside update comment");
  let payload = { name: req.name, message: req.body.message, email: req.email };

  req.db
    .collection(collection)
    .updateOne(
      {
        _id: ObjectID(req.params.id),
        comment: { $elemMatch: { id: ObjectID(req.params.cid) } },
      },
      { $push: { "comment.$.reply": payload } }
    )
    .then((data) => {
      res.status(200).json({ status: "updated succesfully" });
    })
    .catch((err) => {
      res.status(400).json({ status: err });
    });
});

//delete
//http://localhost:3000/helprequests/  method Delete
router.delete("/:id/:email", (req, res) => {
  //console.log("delete", "params", req.params.email, "token", req.email);
  let UID = req.params.email;
  if (req.email === UID) {
    req.db
      .collection(collection)
      .removeOne({ _id: ObjectID(req.params.id) })
      .then((data) => {
        res.status(200).json({ status: "deleted succesfully" });
      })
      .catch((err) => {
        res.status(400).json({ status: err });
      });
  } else {
    res.json({ status: "not allowed to delete" });
  }
});

module.exports = router;
