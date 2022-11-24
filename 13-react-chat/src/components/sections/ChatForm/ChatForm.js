import Button from "components/atoms/Button/Button";
import Input from "components/atoms/Input/Input";

function ChatForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <label>
        Author
        {/* Przekazywanie propsow 2 i wiecej poziomow w dol, nazywa sie Props Drilling (bedziemy sie uczyc jak tego unikac) */}
        <Input
          value={props.authorInputValue}
          onChange={props.handleAuthorInputChange}
        />
      </label>
      <label>
        Message
        <Input
          value={props.messageInputValue}
          onChange={props.handleMessageInputChange}
        />
      </label>
      <Button text="Send"/>
    </form>
  )
}

export default ChatForm;