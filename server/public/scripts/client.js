

$(ready)

function ready() {
    console.log('JQuery Works');
    
    getTodoList()
    $('#addBtn').on('click', addTask);
    $('#viewTasks').on('click', '.deleteBtn', deleteTask);
    $('#viewTasks').on('click', '.completeBtn', completeTask);
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
        } else {
            completeStatus = 'Task Complete';
        }

        $('#viewTasks').append(`
            <tr data-id="${task.id}">
                <td>${task.task}</td>
                <td>${completeStatus}</td>
                <td>${task.complete_by_date}</td>
                <td><button class="deleteBtn">DELETE</button></td>
                <td><button class="completeBtn">COMPLETE</button></td>
            </tr>
        `);
    }
}