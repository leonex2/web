const express = require('express')
const router = express.Router()
const db = require('../config/db')
const bodyParser = require('body-parser')
var crypto = require('crypto');
const {verify,verifyUserDelete} = require('../middleware/auth')

router.get('/', verify ,(req,res) => {
    db.serialize(() => {
        db.all('SELECT * FROM users', [], (err,data) => {     
            if(err){
                res.status(400).json({
                    "error": err.message
                })
            }
            res.status(200).json({
                data
            })
        });
    });
})

router.post('/', (req,res) => {   
    db.serialize(() => { 
        db.get("SELECT username FROM users WHERE username = ?",[req.body.username], (err, row) => {
            if(row) {
                res.status(409).json({
                    "message": "Username Already Taken!"
                });
            }else {
                db.run('INSERT INTO users(username,password) VALUES(?,?)', [req.body.username,crypto.createHash('sha256').update(req.body.password).digest('base64')], (err) => {
                    if (err) {
                        
                        res.status(400).json({
                            "error": err.message
                        })
                    }
                    
                    db.get("SELECT last_insert_rowid() as id FROM users", (err, row) => {
                        res.status(200).json({
                            id: row['id'],
                            username: req.body.username,
                            password: crypto.createHash('sha256').update(req.body.password).digest('base64')
                        });
                    });  
                });
            } 
        });        
    })
})


router.delete('/:id',verifyUserDelete, (req,res) => {
    db.serialize(()=>{
        db.run('DELETE FROM users WHERE id = ?', req.params.id, (err) => {
            if (err) {
                res.status(400).json({
                    "error": err.message
                });
            }
            res.status(200).json({
                id: req.params.id
            });
        });
    });
})

module.exports = router