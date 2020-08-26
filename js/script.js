function addInsertListener() {

  var target = $('#add');
  target.click(insertTask);
}

function insertTask() {

  var target = $('#task_text');
  var text = target.val();

  $.ajax({

    url: 'http://157.230.17.132:3035/todos',
    method: 'POST',
    data: {
      text: text
    },
    success: function(data) {
      getTasks();
    },
    error: function(err) {
      console.log('err', err);
    }
  });
}

function addDeleteListener() {

  $(document).on('click', '.click', deleteTask);
}

function deleteTask() {

  var button = $(this);
  var id = button.data('id');

  $.ajax({

    url: `http://157.230.17.132:3035/todos/${id}`,
    method: 'DELETE',
    success: function(data) {

      getTasks();
    },
    error: function(err) {

      console.log('err', err);
    }
  });
}

function getTasks() {

  $.ajax({
    url: 'http://157.230.17.132:3035/todos',
    method: 'GET',
    success: function(data) {

      printTasks(data);
    },
    error: function(err) {

      console.log('err', err);
    }
  });
}

function printTasks(tasks) {

  var target = $('#tasks');
  target.text('');
  for (var i=0;i<tasks.length;i++) {

    var task = tasks[i];
    target.append(`<li>${task.text} - <span data-id="${task.id}" class="click"><b>x</b></span></li>`);
  }
}

function init() {

  getTasks();
  addInsertListener();
  addDeleteListener();
}

$(document).ready(init);
