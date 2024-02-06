// const taskForm = document.getElementById('taskForm');
// const taskInput = document.getElementById('taskInput');
// const taskDateTime = document.getElementById('taskDateTime');
// const taskList = document.getElementById('taskList');

// // Cargar tareas al cargar la página
// document.addEventListener('DOMContentLoaded', function() {
//   const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//   tasks.forEach(function(task) {
//     const listItem = createTaskElement(task.task, task.dateTime);
//     if (task.completed) {
//       listItem.classList.add('completed');
//     }
//     taskList.appendChild(listItem);
//   });
// });

// // Agregar tarea
// taskForm.addEventListener('submit', function(e) {
//   e.preventDefault();

//   const task = taskInput.value;
//   const dateTime = taskDateTime.value;

//   if (task === '' || dateTime === '') {
//     alert('Por favor ingrese una tarea y seleccione una fecha y hora.');
//     return;
//   }

//   const listItem = createTaskElement(task, dateTime);
//   taskList.appendChild(listItem);

//   saveTask(task, dateTime);

//   taskInput.value = '';
//   taskDateTime.value = '';
// });

// // Crear elemento de tarea
// function createTaskElement(task, dateTime) {
//   const listItem = document.createElement('li');
//   const span = document.createElement('span');
//   const editButton = document.createElement('button');
//   const deleteButton = document.createElement('button');

//   editButton.classList.add('button-edit');
//   deleteButton.classList.add('button-delete');

//   listItem.appendChild(span);
//   listItem.appendChild(editButton);
//   listItem.appendChild(deleteButton);

//   span.textContent = `${task} - ${formatDate(dateTime)}`;
//   editButton.textContent = 'Editar';
//   deleteButton.textContent = 'Eliminar';

//   editButton.addEventListener('click', function() {
//     const newTask = prompt('Editar tarea:', task);
//     if (newTask !== null) {
//       task = newTask;
//       span.textContent = `${task} - ${formatDate(dateTime)}`;
//       updateTask(task, dateTime);
//     }
//   });

//   deleteButton.addEventListener('click', function() {
//     listItem.remove();
//     removeTask(task, dateTime);
//   });

//   listItem.addEventListener('click', function() {
//     listItem.classList.toggle('completed');
//     updateTask(task, dateTime);
//   });

//   return listItem;
// }

// // Guardar tarea en Local Storage
// function saveTask(task, dateTime) {
//   const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//   tasks.push({ task, dateTime, completed: false });
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// // Actualizar tarea en Local Storage
// function updateTask(task, dateTime) {
//   const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//   const updatedTasks = tasks.map(function(t) {
//     if (t.task === task && t.dateTime === dateTime) {
//       t.completed = !t.completed;
//     }
//     return t;
//   });
//   localStorage.setItem('tasks', JSON.stringify(updatedTasks));
// }

// // Eliminar tarea de Local Storage
// function removeTask(task, dateTime) {
//   const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//   const filteredTasks = tasks.filter(function(t) {
//     return !(t.task === task && t.dateTime === dateTime);
//   });
//   localStorage.setItem('tasks', JSON.stringify(filteredTasks));
// }

// // Formatear fecha
// function formatDate(dateTimeString) {
//   const date = new Date(dateTimeString);
//   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
//   return date.toLocaleDateString('es-ES', options);
// }


const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskDateTime = document.getElementById('taskDateTime');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', function() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(function(task) {
    if (isTaskPast(task.dateTime)) {
      removeTask(task.task, task.dateTime);
      return;
    }
    const listItem = createTaskElement(task.task, task.dateTime);
    if (task.completed) {
      listItem.classList.add('completed');
    }
    taskList.appendChild(listItem);
  });
});

taskForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const task = taskInput.value;
  const dateTime = taskDateTime.value;

  if (task === '' || dateTime === '') {
    alert('Por favor ingrese una tarea y seleccione una fecha y hora.');
    return;
  }

  const listItem = createTaskElement(task, dateTime);
  taskList.appendChild(listItem);

  saveTask(task, dateTime);

  taskInput.value = '';
  taskDateTime.value = '';
});

function createTaskElement(task, dateTime) {
  const listItem = document.createElement('li');
  const span = document.createElement('span');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  editButton.classList.add('button-edit');
  deleteButton.classList.add('button-delete');
  
  listItem.appendChild(span);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  span.textContent = `${task} - ${formatDate(dateTime)}`;
  editButton.textContent = 'Editar';
  deleteButton.textContent = 'Eliminar';

  editButton.addEventListener('click', function() {
    const newTask = prompt('Editar tarea:', task);
    const newDateTime = prompt('Editar fecha y hora:', dateTime);
    if (newTask !== null && newDateTime !== null) {
      task = newTask;
      dateTime = newDateTime;
      span.textContent = `${task} - ${formatDate(dateTime)}`;
      updateTask(task, dateTime);
    }
  });

  deleteButton.addEventListener('click', function() {
    listItem.remove();
    removeTask(task, dateTime);
  });

  listItem.addEventListener('click', function() {
    listItem.classList.toggle('completed');
    updateTask(task, dateTime);
  });

  return listItem;
}

function saveTask(task, dateTime) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ task, dateTime, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(task, dateTime) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.map(function(t) {
    if (t.task === task && t.dateTime === dateTime) {
      t.completed = !t.completed;
    }
    return t;
  });
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function removeTask(task, dateTime) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const filteredTasks = tasks.filter(function(t) {
    return !(t.task === task && t.dateTime === dateTime);
  });
  localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}

function formatDate(dateTimeString) {
  const date = new Date(dateTimeString);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
}

function isTaskPast(dateTime) {
  const taskDateTime = new Date(dateTime);
  const currentDateTime = new Date();
  return taskDateTime < currentDateTime;
}