const express = require('express')
const cors = require('cors')
const port = 5000

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const todoRouter = require('./routers/todo')


app.use('/todo',todoRouter)

app.listen(port, () => {
    console.log("Server Starting on Port 3000")
})