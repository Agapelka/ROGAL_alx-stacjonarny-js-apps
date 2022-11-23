import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
// Napisz aplikacje Chat, skladajaca sie z formularza i listy. Formularz ma zawierac 2 pola input na author i message. Nastepnie po wcisnieciu przycisku Wyslij, wyswietl wiadomosci w liscie.


// Napisz walidacje do chatu, ze pole author nie moze byc puste i message nie moze byc krotsze niz 3 znaki


const Chat = () => {
  const [authorInputValue, setAuthorInputValue] = useState('');
  const [isAuthorInputError, setIsAuthorInputError] = useState(false);

  const [messageInputValue, setMessageInputValue] = useState('');
  const [isMessageInputError, setIsMessageInputError] = useState(false);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // const messagesFromLS = localStorage.getItem('messages');

    // if(messagesFromLS) {
    //   setMessages(JSON.parse(messagesFromLS));
    // }

    fetch('http://localhost:5000/messages')
      .then(res => res.json())
      .then(data => {
        setMessages(data);
      })
  }, [])

  // Funkcja do walidacji
  // Dobra praktyka do posiadania zlozonej walidacji
  const validateForm = () => {
    let valid = true;

    if(authorInputValue.length === 0) {
      valid = false;
      setIsAuthorInputError(true)
    } else {
      setIsAuthorInputError(false);
    }

    if(messageInputValue.length <= 2) {
      valid = false;
      setIsMessageInputError(true);
    } else {
      setIsMessageInputError(false);
    }

    return valid;
  }

  const postMessage = message => {
    fetch('http://localhost:5000/messages', {
      method: 'POST',
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify(message)
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const isFormValid = validateForm();

    if(!isFormValid) {
      return;
    }

    const newMessage = {
      id: uuidv4(),
      author: authorInputValue,
      message: messageInputValue
    }

    // dodanie obiektu do obecnej tablicy obiektow (przygotowanie nowej zmiennej do stanu)
    const newMessages = messages.concat(newMessage)

    // podmiana listy w stanie
    setMessages(newMessages)
    // localStorage.setItem('messages', JSON.stringify(newMessages));
    postMessage(newMessage)

    // Czyszczenie formularza
    setAuthorInputValue('');
    setMessageInputValue('');
  }

  const handleAuthorInputChange = event => {
    setAuthorInputValue(event.target.value);
  }

  const handleMessageInputChange = event => {
    setMessageInputValue(event.target.value);
  }

  const removeMessage = (id) => {
    fetch(`http://localhost:5000/messages/${id}`, {
      method: 'DELETE'
    })
  }

  const handleMessageRemove = (id) => {
    const filteredMessages = messages.filter(message => {
      return message.id !== id;
    })

    setMessages(filteredMessages);
    removeMessage(id);
    // localStorage.setItem('messages', JSON.stringify(filteredMessages));
  }

  return (
    <div>
      <h1>Hello Chat</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Author
            <input type="text" value={authorInputValue} onChange={handleAuthorInputChange}/>
          </label>
          {
            isAuthorInputError
              ? <p>Pole Author nie moze byc puste</p>
              : null
          }
        </div>
        <div>
          <label>
            Message
            <input type="text" value={messageInputValue} onChange={handleMessageInputChange}/>
          </label>
          {
            isMessageInputError
              ? <p>Pole Message musi byc dluzsze niz 3 znaki</p>
              : null
          }
        </div>
        <button type="submit">Send</button>
      </form>
      <ul>
        {
          messages.map(message => {
            return (
              <li key={message.id}>
                {message.message} - <strong>{message.author}</strong>
                <button onClick={() => handleMessageRemove(message.id)}>X</button>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Chat;