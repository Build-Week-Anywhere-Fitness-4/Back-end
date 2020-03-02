const express = require("express")
const cors = require("cors")
const helmet = require("helmet")

const authRouter = require('../auth/router')
const userRouter = require('../users/router')
const classRouter = require("../classes/router")
const restricted = require('../auth/restricted-middleware')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())


server.get("/", (req,res) => {
    res.status(200).json({message: "let the games begin"})
})

server.use('/api/', authRouter)
server.use('/api/users', restricted, userRouter)
server.use('/api/classes',restricted, classRouter)

module.exports = server