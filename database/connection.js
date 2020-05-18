const knex = require("knex");

const knexfile = require("../knexfile.js");
const enviornment = "development";

module.exports = knex(knexfile[enviornment]);