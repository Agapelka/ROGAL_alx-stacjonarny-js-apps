// Dobra praktyka jest taka, ze najpierw importujemy kod z bibliotek, a dopiero pozniej nasze komponenty/funkcje/style
import { useState, useEffect } from 'react';

import WelcomeBox from "../../sections/WelcomeBox/WelcomeBox"
import TodoList from '../../sections/TodoList/TodoList';
import TodoForm from '../../sections/TodoForm/TodoForm';

// Najlepiej aplikacje dzielic na komponenty, tworzac na poczatku cala logike, a dopiero pozniej zastanawiac sie, jak to podzielic na mniejsze kawalki

function TodoPage() {
  const [taskNameInput, setTaskNameInput] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todosFromLS = localStorage.getItem('todos');

    if(todosFromLS) {
      setTodos(JSON.parse(todosFromLS));
    }
  }, [])

  const handleSubmit = event => {
    event.preventDefault();

    // generowanie ID za pomoca timestampa
    const generatedId = Date.now();

    const newTodo = {
      id: generatedId,
      text: taskNameInput
    }

    const newTodos = todos.concat(newTodo);

    localStorage.setItem('todos', JSON.stringify(newTodos));

    setTodos(newTodos);
    setTaskNameInput('')
  }

  const handleTaskNameChange = event => {
    setTaskNameInput(event.target.value);
  }

  const handleRemoveTodo = idToRemove => {
    const filteredTodos = todos.filter(todo => todo.id !== idToRemove);

    setTodos(filteredTodos);
    localStorage.setItem('todos', JSON.stringify(filteredTodos));
  }

  return (
    <div>
      <WelcomeBox title="Welcome in our todo app"/>
      <TodoForm
        handleSubmit={handleSubmit}
        handleTaskNameChange={handleTaskNameChange}
        taskNameInput={taskNameInput}
      />

      {/* W dzieleniu na komponenty, moge do komponentu wyslac rozne typy danych: tablice, funkcje, stringi, itp. */}
      <TodoList
        todoFromPage={todos}
        hadleRemoveTodoFromPage={handleRemoveTodo}
      />
    </div>
  )
}

export default TodoPage