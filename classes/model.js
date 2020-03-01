const db = require('../database/dbConfig')

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    getWorkout
}

function find(){
    return db('classes').orderBy('classes.id')
}

function findById(id){
    return db("classes").where({ id }).first()
}

function add(exercise) {
    return db('classes')
    .insert(exercise, 'id')
    .then(ids => {
        return findById(ids[0])
    })
}

function update(id, changes){
    return db('classes')
    .where({ id })
    .update(changes)
    .then(() => findById(id))
}

function remove(id){
    return db('classes')
    .where({ id })
    .delete()
}

function getWorkout(id){
    return db('classes as c')
    .join("users_classes as uc", "c.id", "uc.class_id")
    .join("users as u", "users.id", "uc.user_id")
    .select("c.name", "u.username", "c.location", "c.start_time", "c.duration", "u.id as user_id")
    .where('u.id', id)
}