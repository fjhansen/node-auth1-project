const bcryptjs = require("bcryptjs");

const router = require("express").Router();

const Users = require("../users/users-model.js")
const { isValid } = require("../users/users-service")

router.post('/api/register', (req, res) => {
  const newUser = req.body;

  if (isValid(newUser)) {

    // hash password
    const hash = bcryptjs.hashSync(newUser.password, 16)
    newUser.password = hash;

    // save newUser to DB

    Users.addUser(newUser)
    .then(user => {
      req.session.loggedIn === true;

      res.status(201).json({ data: user })
    })
    .catch(error => {
      res.status(500).json({ message: error.message })
    });
  } else {
    res.status(400).json({
      message: "provice username and password, and password must be alphanumeric"
    })
  }
})

module.exports = router;