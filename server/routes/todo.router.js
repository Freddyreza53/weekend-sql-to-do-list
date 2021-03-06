const express = require('express');
const todoRouter = express.Router();
// DB Connection
const pool = require('../modules/pool');
const moment = require('moment');

// GET list from DB
todoRouter.get('/', (req, res) => {
    console.log('in GET');

    let queryText = `
    SELECT * FROM "todo_list" ORDER BY "status", "complete_by_date";
    `;

    pool.query(queryText).then(todo_list => {
        console.log('from DB', todo_list.rows);
        for (const task of todo_list.rows) {
            task.complete_by_date = moment(task.complete_by_date).format('ddd, MMMM Do YYYY');
        }
        res.send(todo_list.rows)
    }).catch(error => {
        console.log('Error getting todo_list', error);
        res.sendStatus(500);
    });
})

// GET list from DB in progress only
todoRouter.get('/showInProgress', (req, res) => {
    console.log('in GET');

    let queryText = `
        SELECT * FROM "todo_list" 
        WHERE "status" = FALSE
        ORDER BY "complete_by_date";
    `;

    pool.query(queryText).then(todo_list => {
        console.log('from DB', todo_list.rows);
        for (const task of todo_list.rows) {
            task.complete_by_date = moment(task.complete_by_date).format('ddd, MMMM Do YYYY');
        }
        res.send(todo_list.rows)
    }).catch(error => {
        console.log('Error getting todo_list', error);
        res.sendStatus(500);
    });
})

// GET list from DB completed only
todoRouter.get('/showCompleted', (req, res) => {
    console.log('in GET');

    let queryText = `
        SELECT * FROM "todo_list" 
        WHERE "status" = TRUE
        ORDER BY "complete_by_date";
        `;

    pool.query(queryText).then(todo_list => {
        console.log('from DB', todo_list.rows);
        for (const task of todo_list.rows) {
            task.complete_by_date = moment(task.complete_by_date).format('ddd, MMMM Do YYYY');
        }
        res.send(todo_list.rows)
    }).catch(error => {
        console.log('Error getting todo_list', error);
        res.sendStatus(500);
    });
})

// Attempt at using DB to search
// todoRouter.get('/searchTask', (req, res) => {
//     console.log('in GET', req.body);

//     let queryText = `
//         SELECT * FROM "todo_list"
//         WHERE "task" ILIKE $1 AND "complete_by_date" = $2;
//     `;

//     let values = [req.body.task, req.body.date];

//     pool.query(queryText, values).then(todo_list => {
//         console.log('from DB', todo_list.rows);
//         for (const task of todo_list.rows) {
//             task.complete_by_date = moment(task.complete_by_date).format('ddd, MMMM Do YYYY');
//         }
//         res.send(todo_list.rows)
//     }).catch(error => {
//         console.log('Error getting todo_list', error);
//         res.sendStatus(500);
//     });
// })


// GET list from DB completed only
// todoRouter.get('/sortDateCompleted', (req, res) => {
//     console.log('in GET');

//     let queryText = `
//         SELECT * FROM "todo_list"
//         ORDER BY "complete_by_date" ASC;
//     `;

//     pool.query(queryText).then(todo_list => {
//         console.log('from DB', todo_list.rows);
//         for (const task of todo_list.rows) {
//             task.complete_by_date = moment(task.complete_by_date).format('ddd, MMMM Do YYYY');
//         }
//         res.send(todo_list.rows)
//     }).catch(error => {
//         console.log('Error getting todo_list', error);
//         res.sendStatus(500);
//     });
// })

// POST user data to DB
// FIXME - use now() if date is empty
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
        console.log('Error adding new task', error);
    });
})

// DELETE task using id number
todoRouter.delete('/:id', (req, res) => {
    console.log('delete task', req.params.id);
    
    let id = req.params.id;
    let queryText = `
    DELETE FROM "todo_list"
    WHERE "id" = $1;
    `;

    const values = [id];

    pool.query(queryText, values).then(result => {
        res.sendStatus(204);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})

// PUT update status of task
todoRouter.put('/:id', (req, res) => {
    console.log('update task', req.params.id);
    
    let id = req.params.id;
    let queryText = `
    UPDATE "todo_list"
    SET "status" = TRUE
    WHERE "id" = $1;
    `;

    const values = [id];

    pool.query(queryText, values).then(results => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})


module.exports = todoRouter;