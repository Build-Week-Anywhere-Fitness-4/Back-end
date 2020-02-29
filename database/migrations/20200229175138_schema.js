
exports.up = function(knex) {
  return knex.schema
  .createTable("users", tbl => {
      tbl.increments();
      tbl.string("username", 128).notNullable().unique()
      tbl.string("password", 128).notNullable()
      tbl.string("email", 128).notNullable().unique()
      tbl.string('role').notNullable()
  })
  .createTable("classes", tbl => {
      tbl.increments();
      tbl.string("name", 255).notNullable()
      tbl.string("type", 255).notNullable()
      tbl.string("duration", 255).notNullable()
      tbl.string("intensity", 255).notNullable()
      tbl.string("location", 255)
      tbl.time("start_time")
      tbl.string("size", 5)
      tbl.string("max_size", 5)
  })
  .createTable("users_classes", tbl => {
    tbl.increments();
    tbl
        .integer("user_id")
        .references("id")
        .inTable("users")
        .unsigned()
        .notNullable()
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
    tbl
        .integer("class_id")
        .references("id")
        .inTable("classes")
        .unsigned()
        .notNullable()
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("users_classes")
    .dropTableIfExists("classes")
    .dropTableIfExists("users")
};
