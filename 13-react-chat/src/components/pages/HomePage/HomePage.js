import { useEffect, useState, useContext } from 'react';

import { GlobalContext } from 'contexts/global';

import ChatForm from 'components/sections/ChatForm/ChatForm';
import ChatMessages from 'components/sections/ChatMessages/ChatMessages';
import MainTemplate from 'components/templates/MainTemplate/MainTemplate';

import { getMessages, postMessage, removeMessage } from 'utils/http'
// Wydziel funkcje fetchMessages i postMessage do pliku http.js

function HomePage() {
  const [messages, setMessages] = useState([]);

  // useState jest przykladem destrukturyzacji tablic
  // na indeksie 0 jest wartosc stanu
  // na indeksie 1 jest funkcja ktora zmienia wartosc zmiennej stanu
  const [authorInputValue, setAuthorInputValue] = useState('');
  const [isAuthorInputError, setIsAuthorInputError] = useState(false);

  const [messageInputValue, setMessageInputValue] = useState('');
  const [isMessageInputError, setIsMessageInputError] = useState(false);

  // Wszystko to, co zostalo wyslane w atrybucie w Context.Provider, jest mozliwe do odebrania przy uzyciu hooku useContext
  // const globalState = useContext(GlobalContext);

  // Odczytywanie wartosci z HomePage
  // console.log('Stan globalny wyswietlony w HomePage');
  // console.log(globalState.text);


  // Zadanie na teraz

  // - Do stanu globalnego dodaj zmienna theme, ktorej wartosc ustaw na light
  // - Zmienna theme odczytaj w komponencie Navigation

  // - Jesli zmienna theme jest ustawiona na dark to zmien styl nawigacji na ciemny (background musi byc ciemny a linki musza byc jasne)



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

    // zasady, kiedy formularz jest prawidlowo wypelniony
    const valid = authorInputValue.length > 0 && messageInputValue.length > 2;

    // if(authorInputValue.length === 0) {
    //   setIsAuthorInputError(true);
    // } else {
    //   setIsAuthorInputError(false);
    // }

    // Skrot od tego if/else co mamy powyzej
    setIsAuthorInputError(authorInputValue.length === 0)

    // if(messageInputValue.length <= 2) {
    //   setIsMessageInputError(true);
    // } else {
    //   setIsMessageInputError(false);
    // }

    // Skrot od tego if/else co mamy powyzej
    setIsMessageInputError(messageInputValue.length <= 2)

    if(!valid) {
      return;
    }

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

  const handleMessageRemove = id => {
    const filteredMessages = messages.filter(message => {
      return message.id !== id
    })

    removeMessage(id)
    setMessages(filteredMessages)
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
        isMessageError={isMessageInputError}
        isAuthorError={isAuthorInputError}
      />
      <ChatMessages
        messages={messages}
        onMessageRemove={handleMessageRemove}
      />
    </MainTemplate>
  );
}

export default HomePage;
