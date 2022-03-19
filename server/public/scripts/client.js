

$(ready)

function ready() {
    console.log('JQuery Works');
    
    getTodoList()
    $('#addBtn').on('click', addTask);
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
            <tr>
                <td>${task.task}</td>
                <td>${completeStatus}</td>
                <td>${task.complete_by_date}</td>
                <td><button>DELETE</button></td>
                <td><button>COMPLETE</button></td>
            </tr>
        `);
    }
}