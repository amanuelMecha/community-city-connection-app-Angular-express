const { ObjectID } = require("bson");
var express = require("express");
var router = express.Router();
const env = require("dotenv").config();
const collection = process.env.serviceProviders;
/* GET all services. */
//http://localhost:3000/services/  method GET

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
//http://localhost:3000/services/  method Get
router.get("/city/:skip", (req, res) => {
  let searchByCity;

  if (req.query.city !== "null") {
    searchByCity = req.query.city;
  } else {
    searchByCity = req.address.city;
  }
  // console.log("service provider city", req.address.city);
  let skipNumber = (req.params.skip - 1) * 3;
  req.db
    .collection(collection)
    .find({
      "address.city": searchByCity,
      date: { $gt: new Date(new Date().getTime() - 1000 * 3600 * 48) },
    })
    .sort({ date: -1 })
    .skip(skipNumber)
    .limit(3)
    .toArray()
    .then((data) => {
      // console.log("service provider data", data);
      res.status(200).json({ status: "success", result: data });
    });
});
//get by id
//http://localhost:3000/services/  method Get
router.get("/:id", function (req, res, next) {
  req.db
    .collection(collection)
    .find({ _id: ObjectID(req.params.id) })
    .toArray()
    .then((data) => {
      res.status(200).json({ status: "success", result: data });
    });
});

//post new service
//http://localhost:3000/services/  method post
router.post("/", function (req, res, next) {
  //let x = "60b995d14bab0260ecabbc0d";
  console.log(" luwam", req.query.changecityName);
  newpost = {
    date: new Date(),
    service: req.body.service,
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
    comment: [ ],
  };
  req.db
    .collection(collection)
    .insertOne(newpost)
    .then((data) => {
      res.status(200).json({ status: "success", result: data });
    })
    .catch((err) => {
      res.json({ status: err });
    });
});
//add comment
//http://localhost:3000/services/  method put
router.put("/:id/comments", (req, res) => {
  //console.log("inside update comment", req.body);
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
//http://localhost:3000/services/  method put
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
//http://localhost:3000/services/  method delete
router.delete("/:id/:email", (req, res) => {
  // console.log("delete", req.params.email, req.email);
  let UID = req.params.email;
  if (req.email === UID) {
    req.db
      .collection(collection)
      .removeOne({ _id: ObjectID(req.params.id, { "contact.email": UID }) })
      .then((data) => {
        res.status(200).json({ status: "deleted succesfully" });
      })
      .catch((err) => {
        res.status(400).json({ status: err });
      });
  } else {
    res.json({ status: "u are not allowed to delete" });
  }
});
module.exports = router;
