const db = require("../models");
const Todo = db.todos;
const Op = db.Sequelize.Op;

// Create and Save a new Todo
exports.create = (req, res) => {
    Todo.create({
        title: req.body.title
    })
    .then(todo => {
        res.status(200).send({
            data: todo
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    })
};

// Retrieve all Todo from the database.
exports.findAll = (req, res) => {
    const todos = Todo.findAll();
    res.status(200).send({
        data: todos
    });
};