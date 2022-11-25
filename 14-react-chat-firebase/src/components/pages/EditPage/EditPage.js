import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, get, set, child } from "firebase/database";

import { database } from "utils/firebase";

import Footer from "components/sections/Footer/Footer";
import Navigation from "components/sections/Navigation/Navigation";
import ChatForm from 'components/sections/ChatForm/ChatForm';

const messagesRef = ref(database, '/messages');

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
    get(child(messagesRef, `${params.messageId}`))
      .then(data => {
        // wyswietlenie z FB konkretnej wiadomosi
        const fetchedMessage = data.val();

        setAuthorInputValue(fetchedMessage.author)
        setMessageInputValue(fetchedMessage.message)
      })

  }, [params.messageId])

  const handleSubmit = event => {
    event.preventDefault();

    // zasady, kiedy formularz jest prawidlowo wypelniony
    const valid = authorInputValue.length > 0 && messageInputValue.length > 2;

    setIsAuthorInputError(authorInputValue.length === 0)
    setIsMessageInputError(messageInputValue.length <= 2)

    if(!valid) {
      return;
    }

    const editedMessage = {
      author: authorInputValue,
      message: messageInputValue
    }

    set(ref(database, 'messages/' + params.messageId), editedMessage)
      .then(() => {
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