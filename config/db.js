const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const dbPath = path.resolve(__dirname, '../DB/todo.db')

const db = new sqlite3.Database(dbPath,(err) => {
    if(err){
        console.log("err opening connection to database",err)
    }else {
        console.log("Connected to Database")
        db.run('CREATE TABLE IF NOT EXISTS todos(id INTEGER PRIMARY KEY AUTOINCREMENT, todo TEXT, status int)')
        db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)')
    }
})

module.exports = db