function loadData(){
  const xhr = new XMLHttpRequest();
  const apiUrl = 'https://dummyjson.com/todos?limit=10&skip=80';
  xhr.open('GET', apiUrl, true);
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      const response = JSON.parse(xhr.responseText);
      const todos = response.todos;
      const groupedTodos = {};

      // Group todos by userId
      todos.forEach(todo => {
        const { userId } = todo;
        if (!groupedTodos[userId]) {
          groupedTodos[userId] = [];
        }
        groupedTodos[userId].push(todo);
      });

      renderTodos(groupedTodos);
    } else {
      console.error('Error fetching todos: ' + xhr.statusText);
    }
  };
  xhr.onerror = function() {
    console.error('Network error');
  };
  xhr.send();

}

function renderTodos(groupedTodos) {
  const container = document.getElementById('todo-container');

  for (const userId in groupedTodos) {
    const userTodos = groupedTodos[userId];
    const userDiv = document.createElement('div');
    userDiv.className = 'user-todos';

    const userTitle = document.createElement('h3');
    userTitle.textContent = `User ${userId}`;
    userDiv.appendChild(userTitle);

    const todoList = document.createElement('ul');
    userTodos.forEach(todo => {
      const todoItem = document.createElement('li');
      todoItem.textContent = todo.todo;
      todoList.appendChild(todoItem);
    });

    userDiv.appendChild(todoList);
    container.appendChild(userDiv);
  }
}