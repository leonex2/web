const express = require('express')
const cors = require('cors')
const port = 5000

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
const {verify} = require('./middleware/auth')

const todoRouter = require('./routers/todo')
const userRouter = require('./routers/user')

app.use('/todo', verify ,todoRouter)
app.use('/user',userRouter)

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(port, () => {
    console.log("Server Starting on Port 5000")
})