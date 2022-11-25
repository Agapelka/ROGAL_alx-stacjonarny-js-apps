export const editMessage = (id, message) => {
  return fetch(`http://localhost:5000/messages/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(message)
  })
}

export const getMessage = (id) => {
  return fetch(`http://localhost:5000/messages/${id}`)
    .then(res => res.json())
}

export const postMessage = messageToSend => {
  fetch('http://localhost:5000/messages', {
    method: 'POST',
    headers: {
      'Content-type': "application/json"
    },
    body: JSON.stringify(messageToSend)
  })
}

export const getMessages = () => {
  return fetch('http://localhost:5000/messages')
    .then((res) => res.json())
}

export const removeMessage = (idToRemove) => {
  // jesli nie potrzebujemy robic .then() na promisie, to nie potrzebujemy robic return
  fetch(`http://localhost:5000/messages/${idToRemove}`, {
    method: 'DELETE'
  })
}