const db = require('../config/db')
var crypto = require('crypto');

exports.verify = (req,res,next) => {
    db.serialize(() => {
        db.all('SELECT * FROM users WHERE username = ? AND password = ?', [req.headers.username,crypto.createHash('sha256').update(req.headers.password).digest('base64')], (err,data) => {     
            if(err){
                res.status(400).json({
                    "error": err.message
                })
                return
            }

            if (data.length == 0) {
                res.status(401).json({
                    "message": "Unauthorized!"
                })
                return
            }

            req.body.user = req.headers.username
            req.body.password = req.headers.password
            next()
        });
    });
}

exports.verifyUserDelete = (req,res,next) => {
    db.serialize(() => {
        db.all('SELECT * FROM users WHERE username = ? AND password = ?', [req.headers.username,crypto.createHash('sha256').update(req.headers.password).digest('base64')], (err,data) => {     
            if(err){
                res.status(400).json({
                    "error": err.message
                })
                return
            }

            if (data.length == 0) {
                res.status(401).json({
                    "message": "Unauthorized!"
                })
                return
            }

            if(data[0].id != req.params.id) {
                res.status(403).json({
                    "message": "Not Allowed to Delete Other User!"
                })
                return
            }

            req.body.user = req.header.username
            req.body.password = req.header.password
            next()
        });
    });
}