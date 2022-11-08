import { v4 as uuidv4 } from 'uuid';

const todoForm = document.querySelector('#todoForm');
const todoTitleInput = document.querySelector('#todoTitleInput');
const todoAuthorInput = document.querySelector('#todoAuthorInput');

const addTodo = (todoToSend) => {
  fetch('http://localhost:5000/todos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(todoToSend)
  })
  .then(() => {
    window.location.href = 'index.html';
  })
}

const handleSubmit = (event) => {
  event.preventDefault();

  const newTodo = {
    // Dobra praktyka jest to, ze to BE tworzy randomowy ID (wiekszosc baz danych, tworzy je samodzielnie)
    id: uuidv4(),
    title: todoTitleInput.value,
    author: todoAuthorInput.value
  }

  addTodo(newTodo);
}

todoForm.addEventListener('submit', handleSubmit);