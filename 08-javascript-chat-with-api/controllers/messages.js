import fs from 'fs';

const fsp = fs.promises;

export const getMessages = () => {
  return fsp.readFile('data/messages.json', 'utf8');
}

export const getMessage = (id) => {
  return getMessages()
    .then(data => {
      const parsedJSON = JSON.parse(data);
      const foundMessage = parsedJSON.messages.find(message => message.id === id);

      return foundMessage;
    })
}

export const saveMessages = (newMessage) => {
  return getMessages()
    .then(data => {
      const parsedJSON = JSON.parse(data);

      parsedJSON.messages.push(newMessage)

      return fsp.writeFile('data/messages.json', JSON.stringify(parsedJSON), 'utf8');
    })
}

export const deleteMessage = (idToDelete) => {
  return getMessages()
    .then(data => {
      const parsedJSON = JSON.parse(data);

      // Usuwanie w JS to jest filtrowanie elementow, ktore nie sa tym, ktory zostal klikniety
      const filteredMessages = parsedJSON.messages.filter(message => {
        return message.id !== idToDelete
      })
      // console.log(filteredMessages);

      // Potrzebujemy utrzymac taka sama strukture JSON, tak aby przy pobieraniu i dodawaniu, wszystko dzialalo poprawnie.

      // Pusta struktura JSON

      // {
      //   "messages": []
      // }

      const fileToSave = {
        messages: filteredMessages
      }

      return fsp.writeFile('data/messages.json', JSON.stringify(fileToSave));
    })
}

export const editMessage = (id, messageToEdit) => {
  return getMessages()
    .then(data => {
      const parsedJSON = JSON.parse(data);

      // findIndex dziala tak samo jak find, tylko zwraca index znalezionego elementu
      const editedElementIndex = parsedJSON.messages.findIndex(message => message.id === id);

      // Tutaj robimy podmiane danych na te, ktore pochodza z requestu
      parsedJSON.messages[editedElementIndex].message = messageToEdit.message
      parsedJSON.messages[editedElementIndex].author = messageToEdit.author

      return fsp.writeFile('data/messages.json', JSON.stringify(parsedJSON), 'utf8');
    })
}