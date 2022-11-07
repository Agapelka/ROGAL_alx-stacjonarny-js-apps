import { v4 as uuidv4 } from 'uuid';

// Stworz aplikacje chat

// Stworz aplikacje chat, ktora zawiera okno chatu i formularz wpisywania wiadomosci.

// 1. Formularz powinien miec 2 inputy, pole author i pole message
// 2. Okno chatu, powinno wyswietlac wyslane wiadomosci wraz z jego autorem
// 3. Wiadomosci zapisz jako tablica obiektow i umiesc je w localStorage
// 4. Po wejsciu na strone, przeczytaj wiadomosci z localStorage i wyswietl w oknie chatu


const chatForm = document.querySelector('#chatForm');
const authorInput = document.querySelector('#authorInput');
const messageInput = document.querySelector('#messageInput');
const messageList = document.querySelector('#messageList')

let messages = [];

// const messagesFromLS = JSON.parse(localStorage.getItem('messages'));
// Warunek sprawdza czy sa jakies rzeczy w LS, zeby w razie czego powinna byc pusta tablica
// Musi byc tablica, bo pozniej uzywamy forEach, ktory jest funkcja tablicowa.
// if(messagesFromLS) {
//   messages = messagesFromLS;
// }

// * ES9 ?? nullish operator
// const messages = JSON.parse(localStorage.getItem('messages')) ?? []

const renderMessage = (messageToRender) => {
  messageList.innerHTML += `
    <li>
      <p>${messageToRender.message} - <strong>${messageToRender.author}</strong></p>
    </li>
  `
}

const handleSubmit = (event) => {
  event.preventDefault();

  const newMessage = {
    id: uuidv4(),
    author: authorInput.value,
    message: messageInput.value
  }

  fetch('http://localhost:5000/messages', {
    method: 'POST',
    headers: {
      'Content-type': "application/json"
    },
    body: JSON.stringify(newMessage)
  })

  renderMessage(newMessage);

  messageInput.value = ''
  authorInput.value = ''
}

chatForm.addEventListener('submit', handleSubmit)

// ten forEach zostal zastepiony danymi z fetch

// messages.forEach((message) => {
//   renderMessage(message);
// })



// Promise i Korzystanie z biblioteki fetch

// Promise - Obiekt wbudowany do asynchronicznosci

// Stany:
//   - pending - promise jest w trakcie wykonywania
//   - fullfilled - promise zostal wykonany pozytywnie
//                FUNKCJA then
//   - rejected - promise zostal wykonany i sie nie udal
//                FUNKCJA catch

// fetch jest to wbudowana metoda do window, sluzaca do zapytan http
// domyslna metoda w fetch to jest GET
fetch('http://localhost:5000/messages')
  .then((response) => {
    // response jest to obiekt zapytania HTTP, trzymajacy rozne informacje

    return response.json(); // wbudowana metoda w fetch, sluzy do wyłuskania wartosci zapytania HTTP
  })
  .then((data) => {
    // Bledy z Promise'a nie sa wyswietlane w konsoli. Do tego potrzebujemy instrukcji catch
    // console.log(data);
    data.forEach((message) => {
      renderMessage(message);
    })
  })
  .catch((error) => {
    console.log(error);
  })

// SNIPPET DO ZAPYTAN HTTP GET

// fetch('link')
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error);
//   })


// Wysylanie danych HTTP

// SNIPPET DO POST

// UWAGA: Pole ID jest wymagane przy POST i PUT

// const messageToSend = {
//   id: uuidv4(),
//   message: 'Tresc wyslana do serwera',
//   author: 'Damian'
// }

// fetch('http://localhost:5000/messages', {
//   method: 'POST',
//   headers: {
//     'Content-type': "application/json"
//   },
//   body: JSON.stringify(messageToSend)
// })