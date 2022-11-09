import { v4 as uuidv4 } from 'uuid'
const addMessageForm = document.querySelector('#addMessageForm');
const messageInput = document.querySelector("#messageInput");
const authorInput = document.querySelector('#authorInput');

const saveToLS = messageObject => {
  // Potrzebuje najpierw pobrac rzeczy z LS, poniewaz potrzebuje DOPISAC nowy element do LS
  let currentMessages = JSON.parse(localStorage.getItem('messages'))

  // Potrzebuje w LS miec zawsze tablice obiektow, wiec musze zabezpieczyc przypadek w ktorym dodawalbym do LS w momencie, gdy LS jest puste.
  if(currentMessages === null) {
    currentMessages = [];
  }

  currentMessages.push(messageObject)

  localStorage.setItem('messages', JSON.stringify(currentMessages));

  window.location.href = 'index.html';
}

const saveMessages = (messageObject) => {
  fetch('http://localhost:5000/messages',   {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(messageObject)
  })
  .then(() => {
    window.location.href = 'index.html';
  })
}

const handleSubmit = (event) => {
  event.preventDefault();

  const newMessage = {
    id: uuidv4(),
    author: authorInput.value,
    message: messageInput.value
  }

  // saveToLS(newMessage)
  saveMessages(newMessage);
}

addMessageForm.addEventListener('submit', handleSubmit)