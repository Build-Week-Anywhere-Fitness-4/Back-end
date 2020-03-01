const router = require("express").Router()
const Classes = require('./model')

router.post('/', (req, res) => {
    const newClass = req.body

    Classes.add(newClass)
    .then( exercise => {
        if(exercise){
            res.status(201).json(exercise)
        } else {
            res.status(400).json({ message: "Cannot add exercise"})
        }
    })
    .catch( () => {
        res.status(500).json({ message: "Cannot create the new class"})
    })
})

router.get('/', (req,res) => {
    Classes.find()
    .then(exercise => {
        res.json(exercise)
    })
    .catch(() => {
        res.status(500).json({ message: "CANNOT FIND CLASSES"})
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params

    Classes.findById(id)
    .then( exercise => {
        if(exercise) {
            res.status(200).json(exercise)
        } else {
            res.status(404).json({ message: "CLASS NOT FOUND"})
        }
    })
    .catch( () => {
        res.status(500).json({ message: "CANNOT GET CLASS"})
    })
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const changes = req.body
    Classes.update(id, changes)
    .then(updated => {
        res.json(updated)
    })
    .catch( () => {
        res.status(500).json({ message: "Cannot udpate class"})
    })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params

    Classes.remove(id)
    .then( deleted => {
        res.status(204).end()
    })
    .catch(() => {
        res.status(500).json({ message: "Cannot delete class"})
    })
})



module.exports = router