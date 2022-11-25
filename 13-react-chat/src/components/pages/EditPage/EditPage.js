import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { editMessage, getMessage } from 'utils/http';

import Footer from "components/sections/Footer/Footer";
import Navigation from "components/sections/Navigation/Navigation";
import ChatForm from 'components/sections/ChatForm/ChatForm';

// Zadanie dla was

// 1. Stworz podstrone About i podlinkuj ja w routerze
// 2. Na podstronie About wyswietl nawigacje i jakies dowolne informacje
// 3. Stworz komponent Footer, ktory bedzie zawieral element <footer> </footer>, z jakims tekstem oraz nawigacja. Nawigacja ma dzialac do strony glownej i do podstrony about. Footer musi byc wywolywany na wszystkich stronach

function EditPage() {
  // funkcja useParams jest potrzebna do tego, aby pobierac informacje z parametrow
  const params = useParams();

  // navigate jest to funkcja, ktora sluzy do przechodzenia na inne podstrony wewnatrz funkcji JS (ekwiwalent window.href = '/')
  const navigate = useNavigate();

  const [authorInputValue, setAuthorInputValue] = useState('');
  const [isAuthorInputError, setIsAuthorInputError] = useState(false);

  const [messageInputValue, setMessageInputValue] = useState('');
  const [isMessageInputError, setIsMessageInputError] = useState(false);
  // aby znalezc pod jaka nazwa przychodzi mi parametr, musi sprawdzic konfiguracje naszego routera
  // console.log(params);

  useEffect(() => {
    getMessage(params.messageId)
      .then(data => {
        // console.log(data);
        // Potrzebuje wypelnic inputy danymi, ktore pochodza z bazy danych
        setAuthorInputValue(data.author)
        setMessageInputValue(data.message)
      })

    // tablica w tym przypadku nie powinna byc pusta, poniewaz ten useEffect powinien sie wykonywac za kazdym razem, jak wchodzimy na podstrone edit
  }, [params.messageId])

  const handleSubmit = event => {
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

    // W przypadku operacji PUT, nie potrzebuje przekazywac id w body, poniewaz ID jest zawarte w parametrze do fetcha
    const editedMessage = {
      author: authorInputValue,
      message: messageInputValue
    }

    editMessage(params.messageId, editedMessage)
      .then(() => {
        // Nie moge przeniesc funkcji navigate, poniewaz ona dziala tylko w komponencie (bo jest funkcja zaimportowana z naszego routera)
        navigate('/');
      })
  }

  const handleAuthorInputChange = (event) => {
    setAuthorInputValue(event.target.value);
  }

  const handleMessageInputChange = (event)  => {
    setMessageInputValue(event.target.value);
  }

  return (
    <div>
      <Navigation />
      <h1>Hello Edit Page :)</h1>

      <ChatForm
        onSubmit={handleSubmit}
        handleMessageInputChange={handleMessageInputChange}
        handleAuthorInputChange={handleAuthorInputChange}
        messageInputValue={messageInputValue}
        authorInputValue={authorInputValue}
        isMessageError={isMessageInputError}
        isAuthorError={isAuthorInputError}
      />

      <Footer />
    </div>

  )
}

export default EditPage;