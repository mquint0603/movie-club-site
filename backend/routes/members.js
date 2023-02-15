const router = require("express").Router();
let Member = require("../models/member.model");

// Get all members
router.route("/").get((req, res) => {
  Member.find()
    .then((members) => res.json(members))
    .catch((err) => res.json(err));
});

// Add new user
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const newUser = new Member({ name });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete user
router.route('/delete/:id').delete((req, res) => {
  Member.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
