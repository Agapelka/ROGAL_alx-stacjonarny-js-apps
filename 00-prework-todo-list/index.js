// 1. Stworz formularz z inputem o nazwie task-title i buttonem Add Todo.
// 2. Stworz pusta liste z 0 elementami
// 3. Po wcisnieciu buttona, dodaj do listy zadanie (tresc zadania pobierz z inputa)
// 4.* Na dole strony stworz button "Remove todos", ktory po wcisnieciu usuwa wszystie todo z listy
// 5.** Umozliwic zapisywanie  i odczytywanie listy z localStorage -->

// Window - wbudowany obiekt przegladarki
// console.log(window);

// Obiekt DOM
// console.log(document);

// Podstawowe selektory

// div {
//   font-size: 16px;
// }

// .jakas-klasa {
//   font-size: 20px;
// }

// #jakies-id {
//   font-size: 26px;
// }

// 1. Zlapanie elementu
// const heading = document.querySelector('#todoTitle');

// 2. Zmiana elementu (Manipulacja tekstem)

// heading.innerHTML = '<p>Zmiana tekstu</p>';
// heading.innerText = 'Zmiana tesktu';

// ES6 Template String
// const myName = 'Damian';
// heading.innerHTML = `Hello ${myName}`;

// console.log(heading.outerHTML) // Wyswietlenie znacznika

// 3. Manipulacja klasami

// heading.classList.add('nowa-klasa'); //dodanie klasy
// heading.classList.remove('nowa-klasa'); //dodanie klasy
// heading.classList.toggle('nowa-klasa'); //dodanie klasy


// 4. Manipulacja atrybutami

// console.log(heading.id)
// heading.id = 'NowyId'
// heading.id += ' DrugieId'

// do jakich atrybutow, mozemy uzyc tych skrotowcow

// .src, .alt, .value

// console.log(heading.getAttribute('id'));
// heading.setAttribute('id', 'anotherId');
// console.log(heading.id);

// 5. Dodatkowe manipulacje

// *Manipulacja stylami (tego nie uzywamy)
// heading.style.color = 'red';
// heading.style.display = 'none';

// 6. Eventy

// Rodzaje zdarzeń
// - click
// - change (keyup, keydown)
// - submit
// - resize
// - DOMContentLoaded
// - focus

// const handleClick = (event) => {
  // console.log('hej!');
  // Wskazanie elementu, ktory spowodowal event
  // console.log(event.target);

  // Blokuje domyslny zachowanie przegladarki
  // event.preventDefault();
// }

// function handleClick() {
// }

// const handleClick = function() {
// }

// // ES6 Arrow function
// const handleClick = () => {
// }

// document.addEventListener('click', handleClick)


// localStorage podstawy

// localStorage.setItem('text', 'hello');
// console.log(localStorage.getItem('text'))

// const todos = [
//   {
//     title: 'Wynieść śmieci'
//   },
//   {
//     title: "Pozmywać"
//   }
// ];

// W localStorage jak i w przesylaniu danych na BE, nie dzialaja struktury JS
// w localStorage i w przesylaniu danych dziala format JSON

// W zwiazku z tym, mozna uzyc metod do zamiany JS na JSON i na odwrot

// Zamiana JS do JSON - JSON.stringify()
// Zamiana JSON do JS - JSON.parse()

// localStorage.setItem('todos', JSON.stringify(todos))

// PRZECHODZENIE PRZEZ ELEMENTY

// const todos = [
//   {
//     title: 'Wynieść śmieci'
//   },
//   {
//     title: "Pozmywać"
//   }
// ];

// Wzor na przechodzenie przez elementy

// todos.forEach(todo => {
//   todoList.innerHTML += `
//     <li> ${todo.title} </li>
//   `
// })



const addTodoForm = document.querySelector('#addTodoForm');
const todoList = document.querySelector('#todoList');
const addTodoInput = document.querySelector('#addTodoInput');
const removeTodosButton = document.querySelector('#removeTodosButton');

let todos = JSON.parse(localStorage.getItem('todos'));
// Robimy to po to, ze poczatkowa wartosc todos nie moze byc null, bo inaczej funkcja forEach by sie wywalila
if(todos === null) {
  todos = [];
}

const handleSubmit = (event) => {
  event.preventDefault(); // Blokowanie domyslnego zachowania przegladarki
  const inputValue = addTodoInput.value;

  todoList.innerHTML += `
    <li> ${inputValue} </li>
  `
  todos.push({ title: inputValue })
  localStorage.setItem('todos', JSON.stringify(todos));

  addTodoInput.value = '';
}

const handleRemoveTodos = () => {
  todoList.innerHTML = '';
  localStorage.removeItem('todos');
}

const renderTodos = () => {
  todos.forEach(todo => {
    todoList.innerHTML += `
      <li> ${todo.title} </li>
    `
  })
}

addTodoForm.addEventListener('submit', handleSubmit);
removeTodosButton.addEventListener('click', handleRemoveTodos)
renderTodos();
