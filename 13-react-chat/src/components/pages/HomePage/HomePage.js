import { useEffect, useState } from 'react';
import ChatForm from 'components/sections/ChatForm/ChatForm';
import ChatMessages from 'components/sections/ChatMessages/ChatMessages';
import MainTemplate from 'components/templates/MainTemplate/MainTemplate';

import { getMessages, postMessage } from 'utils/http'
// Wydziel funkcje fetchMessages i postMessage do pliku http.js

function HomePage() {
  const [messages, setMessages] = useState([]);
  const [authorInputValue, setAuthorInputValue] = useState('');
  const [messageInputValue, setMessageInputValue] = useState('');

  useEffect(() => {
    getMessages()
      .then(data => {
        // jesli chcemy odwrocic tablice, to potrzebujemy uzyc metody tablicowej .reverse()
        setMessages(data.reverse());
      })
  }, [])

  const handleAuthorInputChange = (event) => {
    setAuthorInputValue(event.target.value);
  }

  const handleMessageInputChange = (event)  => {
    setMessageInputValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const generatedId = Date.now()

    const newMessage = {
      id: generatedId,
      author: authorInputValue,
      message: messageInputValue
    }

    const newMessages = messages.concat(newMessage);

    // dodanie do listy
    setMessages(newMessages);
    // wyslanie do json-server
    postMessage(newMessage);

    setAuthorInputValue('')
    setMessageInputValue('');
  }

  // Zadanie dla was: Uzyj templatki na EditPage i AboutPage

  // Uzycie MainTemplate w taki sposob, powoduje ze tresc pomiedzy znacznikami zostanie umieszczona pod nawigacja a nad footerem.
  return (
    <MainTemplate>
      <ChatForm
        onSubmit={handleSubmit}
        handleMessageInputChange={handleMessageInputChange}
        handleAuthorInputChange={handleAuthorInputChange}
        messageInputValue={messageInputValue}
        authorInputValue={authorInputValue}
      />
      <ChatMessages messages={messages}/>
    </MainTemplate>
  );
}

export default HomePage;
