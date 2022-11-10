import { ref, onValue, set } from "firebase/database";
import { database } from "../utils/firebase";

const messagesList = document.querySelector('#messagesList');
const addMessageForm = document.querySelector('#addMessageForm');
const authorInput = document.querySelector('#authorInput');
const messageInput = document.querySelector('#messageInput');

// To sluzy do tego, aby powiedziec firebase, z ktorego miejsca w bazie danych chcemy pobrac dane.
const messagesRef = ref(database, '/messages');

const renderMessages = messages => {
  messagesList.innerHTML = '';

  messages.forEach(messageFromFB => {
    // console.log(messageFromFB.id); //id aktualnego elementu

    messagesList.innerHTML += `
      <li> ${messageFromFB.message} - <strong>${messageFromFB.author}</strong></li>
    `
  })
}

const fetchMessages = () => {
  // Potrzebujemy wlaczyc nasluchiwanie na zmiany w firebase
  onValue(messagesRef, (data) => {
    const messages = data.toJSON();

    // Zeby miec ID w obiekcie, ktory przychodzi z firebase, potrzebujemy dodac id (ktory jest kluczem obiektu), do kazdego obiektu pod pozycja id
    const messagesWithId = Object.keys(messages).map(key => {
      messages[key].id = key; //do kazdego obiektu doklejam klucz id
      return messages[key];
    })

    renderMessages(messagesWithId)

    // Potrzebujemy obiekt obiektow, zamienic na tablice obiektow
    // Object.values przerabia wartosci obiektu na tablice obiektow (pomija klucze)
    // renderMessages(Object.values(messages))
  })
}

const saveMessage = messageToSave => {
  // generuje ID za pomoca timestampow, czyli czasu ktory uplynal od 01.01.1970, co gwarantuje mi tylko i wylacznie wieksze cyfry
  const randomId = Date.now()
  set(ref(database, 'messages/' + randomId), messageToSave)
}

const handleAddMessage = (event) => {
  event.preventDefault();

  // firebase sam generuje ID, wiec nie potrzebujemy tutaj uuid
  const newMessage = {
    author: authorInput.value,
    message: messageInput.value
  }

  saveMessage(newMessage);
}

fetchMessages();
addMessageForm.addEventListener('submit', handleAddMessage)



// 1. Zrob obsluge edycji i usuwania w FB
  // - do edycji skorzystaj z metody set

  // set(ref(database, 'messages/' + elementId), editedData)


  // - do usuwania uzyj metody remove(ref(database, 'messages/' + elementId)). Pamietaj zeby zaimportowac remove


  // Hosting do FB

  // 1. musze uruchomic npm run build (ktory ma pod spodem komende parcel build)
  // 2. npm install -g firebase-tools
  // 3. firebase login
  // 4. firebase init

  // Z czego chcesz skorzystac: tylko hosting
    // ? What do you want to use as your public directory? dist
    // ? Configure as a single-page app (rewrite all urls to /index.html)? No
    // ? Set up automatic builds and deploys with GitHub? No
    // ? File dist/index.html already exists. Overwrite? No

  // 5. firebase deploy