const messagesList = document.querySelector('#messagesList');

// buttons bedzie null, poniewaz w momencie odczytu z HTML nie istnieja te przyciski
// const buttons = document.querySelector('.close');
// console.log(buttons);

let messages = JSON.parse(localStorage.getItem('messages'))

if(messages === null) {
  messages = [];
}

const loadMessages = (messages) => {
  messages.forEach(message => {
    messagesList.innerHTML += `
      <li>
        ${message.message} - <strong>${message.author}</strong>

        <button class="edit" data-elementId="${message.id}">
          &#9998;
        </button>
        <button class="close" data-elementId="${message.id}"> X </button>
      </li>
    `
  })
}

const fetchMessages = () => {
  fetch('http://localhost:5000/messages')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      loadMessages(data.messages)
    })
}

const removeMessage = id => {
  fetch(`http://localhost:5000/messages/${id}`, {
    method: 'DELETE'
  })
  .then(() => {
    console.log('Udalo sie!');
  })
}


const handleMessageRemove = (event) => {
  // Jedno lub drugie mozemy stosowac
  const idToRemove = event.target.getAttribute('data-elementId')
  // const idToRemove = event.target.dataset.elementId

  removeMessage(idToRemove);

  // Usunac element z HTML

  // potrzebujemy uzyc event.target.parentElement, poniewaz chcemy usunac rodzica buttona, czyli element li

  // metoda .remove() sluzy do usuniecia elementu z HTML
  event.target.parentElement.remove()

  // Jesli chce napisac funkcje w API do usuwania, to do API potrzebuje przekazac ID kliknietego elementu
}

const handleMessageEdit = (event) => {
  const idtoEdit = event.target.getAttribute('data-elementId');

  // potrzebuje przekazac id edytowanego elementu do podstrony edit, zeby podstrona edit wiedziala jaki element na stronie chcemy edytowac
  localStorage.setItem('elementToEditId', idtoEdit)

  window.location.href = 'edit.html';
}

const handleListClick = (event) => {
  // zeby dowiedziec sie, ktory element zostal klikniety, potrzebujemy uzyc event.target
  // console.log(event.target);

  // Funkcja sprawdzajaca czy klikamy w dany element

  // event.target.classList.contains('klasa') lub event.target.id === 'id'

  if(event.target.classList.contains('close')) {
    // console.log('element ktory zostal klikniety', event.target);
    handleMessageRemove(event);
  }
  if(event.target.classList.contains('edit')) {
    handleMessageEdit(event);
  }
}


// Jesli chcemy zrobic usuwanie/edycje/wpinanie eventow na rzeczy, ktore jeszcze nie istnieja, potrzebujemy uzyc tzw. propagacji zdarzen
messagesList.addEventListener('click', handleListClick)


// loadMessages(messages);
fetchMessages();

