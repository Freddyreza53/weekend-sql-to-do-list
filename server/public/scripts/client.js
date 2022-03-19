

$(ready)

function ready() {
    console.log('JQuery Works');
    
    getTodoList()
    $('#addBtn').on('click', addTask);
    $('#viewTasks').on('click', '.deleteBtn', deleteTask);
    $('#viewTasks').on('click', '.completeBtn', completeTask);

    $('.all').on('click', showAll);
    $('.inProgress').on('click', showInProgress);
    $('.complete').on('click', showCompleted);

    // $('.sortTask').on('click', sortTask);
    // $('.sortInProgress').on('click', sortInProgress);
    // $('.sortComplete').on('click', sortDateCompleted);
}
function showAll() {
    console.log('in showAll');
    getTodoList()
}

// function sortTask() {
//     console.log('in sortTask');
    
//     $.ajax({
//         method: 'GET',
//         url: '/todoList/sortTask'
//     }).then(function (todoList) {
//         renderList(todoList);
//     }).catch(function (err) {
//         console.log(err);
//     });
// }

// function sortInProgress() {
//     console.log('in sortInProgress');
    
//     $.ajax({
//         method: 'GET',
//         url: '/todoList/sortInProgress'
//     }).then(function (todoList) {
//         renderList(todoList);
//     }).catch(function (err) {
//         console.log(err);
//     });
// }

// function sortDateCompleted() {
//     console.log('in sortDateCompleted');
    
//     $.ajax({
//         method: 'GET',
//         url: '/todoList/sortDateCompleted'
//     }).then(function (todoList) {
//         renderList(todoList);
//     }).catch(function (err) {
//         console.log(err);
//     });
// }

function showInProgress() {
    console.log('in showInProgress');

    $.ajax({
        method: 'GET',
        url: '/todoList/showInProgress'
    }).then(function (todoList) {
        renderList(todoList);
    }).catch(function (err) {
        console.log(err);
    });
}

function showCompleted() {
    console.log('in showCompleted');

    $.ajax({
        method: 'GET',
        url: '/todoList/showCompleted'
    }).then(function (todoList) {
        renderList(todoList);
    }).catch(function (err) {
        console.log(err);
    });
}

function deleteTask() {
    console.log('in deleteTask on click');
    let id = $(this).closest('tr').data('id')
    
    $.ajax({
        method: 'DELETE',
        url: `/todoList/${id}`
    }).then(function(response) {
        console.log('task deleted');
        getTodoList();
    }).catch(function(err) {
        alert('Problem deleting task', err);
    })
}

function completeTask() {
    console.log('in completeTask');

    let id = $(this).closest('tr').data('id')
    console.log('in completeTask', id);
    $.ajax({
        url: `/todoList/${id}`,
        method: 'PUT'
    }).then(function (response) {
        getTodoList();
    }).catch(function (err) {
        console.log(err)
    })
}

function addTask() {
    console.log('in addTask on click');
    
    let taskToSend = {
        task: $('#todoIn').val(),
        date: $('#date').val()
    };

    $.ajax({
        method: 'POST',
        url: '/todoList',
        data: taskToSend
    }).then(function(response) {
        $('#todoIn').val('');
        $('#date').val('');
        getTodoList();
    }).catch(function(err) {
        alert('Problem adding task', err);
    })
}

function getTodoList() {
    console.log('in getTodoList');
    
    $.ajax({
        method: 'GET',
        url: '/todoList'
    }).then(function (todoList) {
        renderList(todoList);
    }).catch(function (err) {
        console.log(err);
    });
}

function renderList(listOfTasks) {
    console.log(listOfTasks);

    $('#viewTasks').empty();
    
    for (let task of listOfTasks) {
        let completeStatus;

        if (task.status === false) {
            completeStatus = 'In Progress';
            $('#viewTasks').append(`
            <tr data-id="${task.id}">
                <td>${task.task}</td>
                <td>${completeStatus}</td>
                <td>${task.complete_by_date}</td>
                <td>
                    <button class="completeBtn btn btn-success ms-1">COMPLETE</button>
                </td>
                <td>
                    <button class="deleteBtn btn btn-danger">DELETE</button>
                </td>
            </tr>
        `);
        } else {
            completeStatus = 'Task Complete';
            $('#viewTasks').append(`
            <tr data-id="${task.id}">
                <td>${task.task}</td>
                <td class="green">${completeStatus}</td>
                <td>${task.complete_by_date}</td>
                <td></td>
                <td><button class="deleteBtn btn btn-danger">DELETE</button></td>
            </tr>
        `);
        }
    }
}