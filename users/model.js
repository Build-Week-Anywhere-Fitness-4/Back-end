const db = require('../database/dbConfig');

module.exports = {
    find,
    findBy,
    findById,
    add,
    update,
    remove
}

function find(){
    return db("users")
}

function findBy(user) {
    return db('users').where(user).first()
}

function findById(id) {
    return db('users')
      .where({ id })
      .first();
  }

function add(user){
    return db('users')
    .insert(user, 'id')
    .then(ids => {
        return findById(ids[0])
    })
}

function update(id, changes){
    return db('users')
    .where({ id })
    .update(changes)
    .then(() => findById(id))
}

function remove(id){
    return db("users").where({ id }).delete()
}