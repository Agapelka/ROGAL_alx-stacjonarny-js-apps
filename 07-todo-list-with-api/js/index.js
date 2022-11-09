// Napisz aplikacje TodoList. Pod spodem lista wymagan

// 1. Stworz strone z lista todos i zaladuj elementy z API
// 2. Zrob nawigacje, dzieki ktorej bedziesz mogl przejsc do podstrony add
// 3. Na podstronie add, zrob obsluge dodawania elementow todo do API
// 4. Po poprawnym dodaniu do strony, przekieruj na podstrone glowna

// Zadania dodatkowe

// 5. Pod lista todo, dodaj przycisk 'remove todos', ktory spowoduje usuniecie wszystkich todos. Rzeczy do wykonania

//  - Dodaj do pliku server.js obsluge endpointa /todos z metoda HTTP REMOVE
//  - Endpoint bedzie mial za zadanie, wyczyscic tablice todos z pliku todos.json
//  - Jesli operacja sie powiedzie, to wyczysc liste z HTML

// 6. Ostyluj listę

// 7*. Dodaj ikonke X przy kazdym elemencie TODO. Nastepnie za pomoca document.addEventListener('click', handleRemoveTodo) i wlasciwosci event.target spraw, zeby usunac kazdy pojedynczy element. (pamietaj o przekazaniu ID na BE).

const todoList = document.querySelector('#todoList');
const removeTodos = document.querySelector('#removeTodos');

// Praktyki SOLID

const renderTodos = (todosToRender) => {
  todosToRender.forEach(todo => {
    todoList.innerHTML += `
      <li>${todo.title} - <strong>${todo.author}</strong></li>
    `
  })
}

const clearTodos = () => {
  todoList.innerHTML = '';
}

const fetchTodos = () => {
  fetch('http://localhost:5000/todos')
    .then(res => res.json())
    .then(data => renderTodos(data.todos))
}

const handleRemoveTodos = () => {
  fetch('http://localhost:5000/todos', {
    method: 'DELETE'
  }).then(() => {
    clearTodos();
  })
}

fetchTodos();
removeTodos.addEventListener('click', handleRemoveTodos)