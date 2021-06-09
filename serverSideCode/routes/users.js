const { ObjectID } = require("bson");
var express = require("express");
var router = express.Router();
const env = require("dotenv").config();
const collection = process.env.users;
/* GET users listing. */
//http://localhost:3000/users/  method GET

router.get("/", function (req, res, next) {
  req.db
    .collection(collection)
    .find()
    .toArray()
    .then((data) => {
      res.status(200).json({ status: "success", result: data });
    });
});

//Get by id
//http://localhost:3000/users/:id  method GET

router.get("/:id", function (req, res, next) {
  req.db
    .collection(collection)
    .findOne({ _id: new ObjectID(req.params.id) })
    .then((data) => {
      res.status(200).json({ status: "success", result: data });
    });
});

//create user account
//http://localhost:3000/users  method post

router.post("/", (req, res) => {
  req.db
    .collection(collection)
    .findOne({ email: req.body.email })
    .then((data) => {
      if (data) {
        res.status(200).json({ status: "success", result: data });
      } else {
        req.db
          .collection(collection)
          .insertOne(req.body)
          .then((data) => {
            res.status(200).json({ status: "created" });
          });
      }
    });
});

//update city
//http://localhost:3000/users/:id  method put
router.put("/:id", (req, res) => {
  // console.log("cityyyyy", req.body);
  req.db
    .collection(collection)
    .updateOne(
      { _id: ObjectID(req.params.id) },
      { $set: { "address.city": req.body.city } }
    )
    .then((data) => {
      res.json({ status: "updated succesffully" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
