
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "AR", password: "test", email: "AR@AR.com", role: "instructor"},
        {username: "mitchell", password: "test", email: "mitchell@mitchell.com", role: "client"}
      ]);
    });
};
