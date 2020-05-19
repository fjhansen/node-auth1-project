const bcryptjs = require("bcryptjs");

const router = require("express").Router();

const Users = require("../users/users-model.js")
const { isValid } = require("../users/users-service")


router.post('/register', (req, res) => {
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
      message: "provide username and password, and password must be alphanumeric"
    })
  }
})

router.post("/login", (req, res) => {
  const { username, password } = req.body
  
  if (isValid(req.body)) {
    Users.findby({ username: username })
    .then(([user]) => {
      if (user && bcryptjs.compareSync(password, user.password)) {
        req.session.loggedIn = true;
        req.session.user = user
        res.status(200).json({ message: 'login successful'})
      } else {
        res.status(401).json({ message: "invalid password and/or username"})
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message })
    });
  } else {
    res.status(400).json({
      message: "provide username and password, and password must be alphanumeric"
    })
  }
})

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ message: "we could not log you out, try later please" });
      } else {
        res.status(204).end();
      }
    });
  } else {
    res.status(204).end();
  }
});


module.exports = router;