const messageInput = document.querySelector('#messageInput')
const authorInput = document.querySelector('#authorInput')
const editMessageForm = document.querySelector('#editMessageForm');

const idToEdit = localStorage.getItem('elementToEditId');

// Powinnismy zrobic walidacje, ze jak nie ma ID do edycji, to przekieruj na strone glowna
if(!idToEdit) {
  window.location.href = 'index.html'
}

// Ta funkcja odpowiada zeby zasilic inputy w dane z BE
const renderDataToHTML = (message) => {
  messageInput.value = message.message
  authorInput.value = message.author
}

const fetchMessageWithId = (id) => {
  fetch(`http://localhost:5000/messages/${id}`)
    .then(res => res.json())
    .then(data => {
      renderDataToHTML(data)
    })
}

const editMessage = messageObject => {
  fetch(`http://localhost:5000/messages/${idToEdit}`, {
    method: 'PUT',
    headers: {
      'Content-type': "application/json"
    },
    body: JSON.stringify(messageObject)
  })
  .then(() => {
    // w momencie w ktorym uda sie edycja, przekieruj na strone glowna
    window.location.href = 'index.html';
  })
}

const handleEdit = (event) => {
  event.preventDefault();

  const messageToEdit = {
    message: messageInput.value,
    author: authorInput.value
  }

  editMessage(messageToEdit)
}

fetchMessageWithId(idToEdit)
editMessageForm.addEventListener('submit', handleEdit)