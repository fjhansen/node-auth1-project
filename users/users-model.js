const db = require("../database/connection.js");

module.exports = {
  addUser,
  fetchUsers,
}

function addUser(user) {
  return db("users")
  .insert(user)
}

function fetchUsers() {
  return db("users").select("id", "username")
}