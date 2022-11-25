import { Link } from 'react-router-dom';
import Button from 'components/atoms/Button/Button';

// Destrukcje moge zrobic rowniez w parametrze funkcji
function ChatMessages({ messages, onMessageRemove }) {
  return (
    <ul>
      {messages.map(message => {
        return (
          <li key={message.id}>
            {message.message} - <strong> {message.author} </strong>

            <Link to={`/edit/${message.id}`}>edytuj</Link>
            <Button text="X" onClick={() => onMessageRemove(message.id)}/>
          </li>
        )
      })}
    </ul>
  )
}

export default ChatMessages;