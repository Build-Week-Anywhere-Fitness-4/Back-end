const router = require('express').Router()
const Users = require("./model")

const {noDuplicate} = require("../middleware/middleware")

router.post('/:id/workouts/', (req, res) => {
    const workout = {
        user_id: Number(req.params.id),
        class_id: req.body.class_id
    }

    Users.addClass(workout)
    .then(activity => {
        res.status(201).json(activity)
    })
    .catch(({name, message, stack, code}) => {
        console.log({name, message, stack, code})
        res.status(500).json({message: 'CANNOT ADD CLASS'})
    })
})

router.get('/:id/workouts', (req, res) => {
    const id = req.params.id
    Users.getClasses(id)
    .then(workout => {
        if (workout){
            res.status(200).json(workout)
        } else {
            res.status(404).json({message: "CANNOT GET USERS WORKOUTS"})
        }
    })
    .catch(({name, message, stack, code}) => {
        console.log({name, message, stack, code})
        res.status(500).json({ message: "CANNOT RETRIVE CLASSES"})
    })
})

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
    const {id} = req.params
    Users.remove(id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(() => {
        res.status(500).json({ message: 'cannot delete user'})
    })
})

router.delete('/:id/workouts/:class_id', (req, res) => {
    const id = req.params.class_id

    Users.deleteClass(id)
    .then(deleted => {
        res.status(201).json(deleted)
    })
    .catch(({name, message, stack, code}) => {
        console.log({name, message, stack, code})
        res.status(500).json({ message: "CANNOT DELETE WORKOUT"})
    })

})

module.exports = router