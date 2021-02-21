const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const usersRouter = require("../users/users-router");
const loginRouter = require("../auth/router");

const server = express();

const sessionConfig = {
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure:  false, 
    httpOnly: true, 
  },
  resave: false,
  saveUninitialized: true,
  name: "monster",
  secret: "pw1",
};

server.use(session(sessionConfig))

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use("/api/users", usersRouter)
server.use("/api/auth", loginRouter)

server.get("/", (req, res) => {
  res.json({ api: "up!" })
})

module.exports = server
