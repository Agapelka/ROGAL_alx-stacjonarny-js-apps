import Button from "../../atoms/Button/Button"

// Dump Component - jedyna funkcja to wyswietlanie tresci
function TodoForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <label>
        Task Name
        <input
          type="text"
          value={props.taskNameInput}
          onChange={props.handleTaskNameChange}
        />
      </label>
      <Button
        text="Send"
        type="submit"
      />
      {/* <button type="submit">Send</button> */}
    </form>
  )
}

export default TodoForm



// Stworz nowy projekt o nazwie 13-react-chat

// - Projekt ma skladac sie z formularza, zawierajacego 2 pola input - author i message oraz listy, wyswietlajacej wiadomosci. Wiadomosci zapisuj do json-server

// - Wydziel aplikacje na komponenty
// - MainPage
// - ChatForm
// - ChatList
// - Button
// - Input

// * Zrob obsluge chat przez firebase