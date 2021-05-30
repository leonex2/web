const express = require('express')
const router = express.Router()
const db = require('../config/db')
const bodyParser = require('body-parser')

router.get('/' ,(req,res) => {
    db.serialize(() => {
        db.all('SELECT * FROM todos', [], (err,data) => {     
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
        db.run('INSERT INTO todos(todo,status) VALUES(?,?)', [req.body.todo,0], (err) => {
            if (err) {
                
                res.status(400).json({
                    "error": err.message
                })
            }
            
            db.get("SELECT last_insert_rowid() as id", (err, row) => {
                res.status(200).json({
                    id: row['id'],
                    todo: req.body.todo,
                    status: 0
                });
            });  
        });
    })
})

router.put('/:id', (req,res) => {
    db.run('UPDATE todos SET status = ? WHERE id = ?', [req.body.status,req.params.id], (err) => {
        if (err) {          
            res.status(400).json({
                "error": err.message
            })
        }
        
        db.get("SELECT * FROM todos WHERE id = ?",[req.params.id], (err, data) => {
            res.status(200).json({
                data
            });
        });  
    });
})

router.delete('/:id', (req,res) => {
    db.serialize(()=>{
        db.run('DELETE FROM todos WHERE id = ?', req.params.id, (err) => {
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