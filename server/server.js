const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const todoRouter = require('./routes/todo.router')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('server/public'));

// My Routes
app.use('/todoList', todoRouter)

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});