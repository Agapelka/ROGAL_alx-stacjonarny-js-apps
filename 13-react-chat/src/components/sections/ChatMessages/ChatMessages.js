import { Link } from 'react-router-dom';

function ChatMessages(props) {
  return (
    <ul>
      {props.messages.map(message => {
        return (
          <li key={message.id}>
            {message.message} - <strong> {message.author} </strong>

            <Link to={`/edit/${message.id}`}>edytuj</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default ChatMessages;