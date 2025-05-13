'use strict';

{
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  const renderTodo = (todo) => {
    /*　HTML化
    - li
      - label
        - input
        - span
      -button
    */
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = todo.isCompleted;
    input.classList.add(todo.tag);
    input.addEventListener('change', () => {
      todos.forEach((item) => {
        if (item.id === todo.id) {
          item.isCompleted = !item.isCompleted;
        }
      });
      saveTodos();
    });
    const span = document.createElement('span');
    span.textContent = todo.title;

    const due = document.createElement('small'); 
    due.textContent = todo.due ? `期限: ${todo.due}` : ''; 
    const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
    if (todo.due === today) {
      span.classList.add('due-today');
    }

    const label = document.createElement('label');
    label.appendChild(input);
    label.appendChild(span);
    label.appendChild(due);
    const button = document.createElement('button');
    button.textContent = 'x';
    button.addEventListener('click', () => {
      if (!confirm('本当に削除しますか？')) return;
      li.remove();
      todos = todos.filter((item) => {
        return item.id !== todo.id;
      });
      saveTodos();
    });
    const li = document.createElement('li');
    li.appendChild(label);
    li.appendChild(button);
    li.classList.add(todo.tag);
    document.querySelector('#todos').appendChild(li);
  };

  const renderTodos = () => {
    todos.forEach((todo) => {
      renderTodo(todo);
    });
  };

  document.querySelector('#add-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('#add-form input');
    const dateInput = document.querySelector('#due-date');
    const tag = document.querySelector('#tag-select').value;
    if (!tag) {
      alert('タグ（color）を選んでください！');
      return;
    }
    const todo = {
      id: Date.now(),
      title: input.value,
      due: dateInput.value,
      tag: tag,
      isCompleted: false,
    };
    renderTodo(todo);
    todos.push(todo);
    console.table(todos);
    saveTodos();
    input.value = '';
    input.focus();
  });

  document.querySelector('#purge').addEventListener('click', () => {
    if (!confirm('本当に削除しますか？')) return;
    todos = todos.filter((todo) => {
      return todo.isCompleted === false;
    });
    saveTodos();
    document.querySelectorAll('#todos li').forEach((li) => {
      li.remove();
    });
    renderTodos();
  });


  renderTodos();
}