const db = require("../database/connection.js");

module.exports = {
  addUser,
  fetchUsers,
  findBy,
  findById
}

async function addUser(user) {
  const [id] = await db("users").insert(user, "id")
  return findById(id)
}

function fetchUsers() {
  return db("users").select("id", "username")
}

function findBy(filter) {
  return db("users").where(filter)
}

function findById(id) {
  return db("users")
  .where({id})
  .first();
}