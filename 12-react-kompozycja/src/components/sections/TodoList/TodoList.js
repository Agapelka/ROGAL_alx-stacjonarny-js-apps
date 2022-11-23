import Button from "../../atoms/Button/Button";
// Dump Component - jedyna funkcja to wyswietlanie tresci
function TodoList(props) {
  return (
    <ul>
      {
        // todoFromPage to jest zmienna stanowa todos pochodza z TodoPage
        props.todoFromPage.map(todo => {
          return (
            <li key={todo.id}>
              {todo.text}
              <Button
                text="Remove"
                onClickAction={() => props.hadleRemoveTodoFromPage(todo.id)}
              />

              {/* <button
                // props.handleRemoveTodoFromPage = handleRemoveTodo
                onClick={() => props.hadleRemoveTodoFromPage(todo.id)}
              >
                Remove
              </button> */}
            </li>
          )
        })
      }
    </ul>
  )
}

export default TodoList;