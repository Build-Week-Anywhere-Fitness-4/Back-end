const db = require('../database/dbConfig');

module.exports = {
    find,
    findBy,
    findById,
    add,
    update,
    remove,
    getClasses,
    addClass,
    deleteClass
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

function getClasses(id){
    return db("users_classes as uc")
    .join("classes as c", "uc.class_id", "c.id")
    .join("users as u", "c.instructor_id", "u.id")
    .select(
            'uc.class_id',
            'c.name',
            'c.description',
            'c.type',
            'c.start_time',
            'c.duration',
            'c.intensity',
            'c.location',
            'c.size', 
            'c.max_size'
        )
    .where('uc.user_id', id)
}

function addClass(workout){
    return db("users_classes").insert(workout)
}

function deleteClass(id){
    return db("users_classes")
    .where({id})
    .delete()
}