exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const users = [
    {
      username: "admin",
      password: "pw1",
    }
  ];

  return knex("users").insert(users);
};
