const express = require('express');
const todoRouter = express.Router();
// DB Connection
const pool = require('../modules/pool');

// GET list from DB
todoRouter.get('/', (req, res) => {
    console.log('in GET');

    let queryText = `
        SELECT * FROM "todo_list";
    `;

    pool.query(queryText).then(todo_list => {
        console.log('from DB', todo_list.rows);
        res.send(todo_list.rows)
    }).catch(error => {
        console.log('Error getting todo_list', error);
        res.sendStatus(500);
    });
})

// POST user data to DB
todoRouter.post('/', (req, res) => {
    let newTask = req.body.task;
    let date = req.body.date;

    let queryText = `
    INSERT INTO "todo_list" 
	    ("task", "complete_by_date") 
    VALUES 
	    ($1, $2)
    `;

    let values = [newTask, date];

    pool.query(queryText, values).then(response => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('Error adding new koala', error);
    });
})


module.exports = todoRouter;