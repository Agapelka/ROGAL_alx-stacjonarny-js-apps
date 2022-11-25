import { Link } from 'react-router-dom';
import Button from 'components/atoms/Button/Button';

function ChatMessages(props) {
  return (
    <ul>
      {props.messages.map(message => {
        return (
          <li key={message.id}>
            {message.message} - <strong> {message.author} </strong>

            <Link to={`/edit/${message.id}`}>edytuj</Link>
            <Button text="X" onClick={() => props.onMessageRemove(message.id)}/>
          </li>
        )
      })}
    </ul>
  )
}

export default ChatMessages;