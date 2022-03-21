

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

    $('#searchBtn').on('click', searchTask)

    // $('.sortTask').on('click', sortTask);
    // $('.sortInProgress').on('click', sortInProgress);
    // $('.sortComplete').on('click', sortDateCompleted);
}
// searchList function allows user to search for task with strings.
function searchList(list) {
    let task = $('#todoIn').val();
    let date = $('#date').val();
    let newList = [];
    for (const item of list) {
        if (date == '' && task == '') {
            return list;
        }
        if (item.task.toLowerCase().includes(task)) {
            newList.push(item);
        }
        //     if (item.task.includes(task)) {
        //         newList.push(item);
        //     }
        // } else if (task == '') {
        //     if (date == item.complete_by_date) {
        //         newList.push(item);
        //     }
        // } 
        // if (item.task.includes(task)) {
        //     newList.push(item);
        // }
    }

    $('#todoIn').val('');
    $('#date').val('');
    return newList;
}

// searchTask function will GET list of all tasks and use 
// searchList function to make new array of matching tasks
function searchTask() {
    console.log('in searchTask');

    getTodoList()

    $.ajax({
        method: 'GET',
        url: '/todoList'
    }).then(function (todoList) {
        renderList(searchList(todoList));
    }).catch(function (err) {
        console.log(err);
    });

    // $.ajax({
    //     method: 'PUT',
    //     url: '/todoList/searchTask',
    //     data: {
    //         task: $('#todoIn').val(),
    //         date: $('#date').val()
    //     }
    // }).then(function (todoList) {
    //     renderList(todoList);
    // }).catch(function (err) {
    //     console.log(err);
    // });
}

// if 'All' on DOM is clicked, table will show all tasks.
function showAll() {
    console.log('in showAll');
    getTodoList()
}

// if 'In Progress' on DOM is clicked, table will show all tasks.
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

// if 'Completed' on DOM is clicked, table will show all tasks.
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

// Will delete a task when the corresponding DELETE button is clicked
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

// Updates status of task when the corresponding COMPLETE button is clicked
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

// will add a Task and its Complete By date 
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

// GETs list from the database
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

// loops through list and appends them row by row
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
                <td class="yellow">${completeStatus}</td>
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