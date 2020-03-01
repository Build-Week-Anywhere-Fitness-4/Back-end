const router = require('express').Router()
const Users = require("./model")

router.get('/', (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(() => {
        res.status(500).json({ message: "CANNOT FIND USERS"})
    })
})

router.get('/:id', (req, res) => {
    Users.findById(req.params.id)
    .then( user => {
        if(user){
            res.status(200).json(user)
        } else {
            res.status(404).json({message: "Cannot find that user"})
        }
    })
    .catch(() => {
        res.status(500).json({message: "Cannot get user"})
    })
})

router.put('/:id', (req, res) => {
    Users.update(req.params.id, req.body)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(() => {
        res.status(500).json({ message: 'cannot update user'})
    })
})

router.delete('/:id', (req,res) => {
    Users.remove(req.params.id)
    .then(user => {
        res.status(204).end()
    })
    .catch(() => {
        res.status(500).json({ message: 'cannot delete user'})
    })
})

module.exports = router