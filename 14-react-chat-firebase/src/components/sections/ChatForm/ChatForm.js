import Button from "components/atoms/Button/Button";
import Input from "components/atoms/Input/Input";

function ChatForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <label>
          Author
          {/* Przekazywanie propsow 2 i wiecej poziomow w dol, nazywa sie Props Drilling (bedziemy sie uczyc jak tego unikac) */}
          <Input
            value={props.authorInputValue}
            onChange={props.handleAuthorInputChange}
          />
        </label>
        {props.isAuthorError ? <p>Pole author nie moze by puste</p> : null}
      </div>

      <div>
        <label>
          Message
          <Input
            value={props.messageInputValue}
            onChange={props.handleMessageInputChange}
          />
        </label>
        {props.isMessageError ? <p>Pole message musi miec wiecej niz 2 znaki</p> : null}
      </div>

      <Button text="Send"/>
    </form>
  )
}

export default ChatForm;