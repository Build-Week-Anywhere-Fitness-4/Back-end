const db = require('../database/dbConfig')

module.exports = {
    find,
    findById,
    add,
    update,
    remove
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

