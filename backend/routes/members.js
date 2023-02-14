const router = require("express").Router();
let Member = require("../models/member.model");

router.route("/").get((req, res) => {
  Member.find()
    .then((members) => res.json(members))
    .catch((err) => res.json(err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const newUser = new Member({ name });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
