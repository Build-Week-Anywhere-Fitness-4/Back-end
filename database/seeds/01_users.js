const bcrypt = require("bcryptjs")
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: "AR",
          password: bcrypt.hashSync("test", 8),
          email: "AR@AR.com",
          role: "instructor"
        },
        {
          username: "mitchell",
          password: bcrypt.hashSync("test", 8),
          email: "mitchell@mitchell.com",
          role: "client"
        }
      ]);
    });
};
