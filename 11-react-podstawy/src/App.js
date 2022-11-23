import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
// w reactcie, jesli chcemy uzyc zdjec, to potrzebujemy je zaimportowac
import logo from './logo.svg';
import './App.css';

// Jesli funkcja zwraca kawalek HTML, to jest to komponent

// - wewnatrz komponentow moge uzywac wszystkich funkcji dostepnych w React
// - Nazwy komponentow musza byc z wielkiej litery
const App = () => {
  // wszystkie funkcje (eventy, dodatkowe funkcje, musza znalezc sie w srodku komponentu)
  const [isTaskNameError, setIsTaskNameError] = useState(false);

  // - Musimy zdefiniowac sobie zmienna stanowa, ktora bedzie trzymac poczatkowa wartosc oraz funkcje, ktora odpowiada za zmiane tego stanu
  const [todos, setTodos] = useState([]);


  // useEffect jest to funkcja, ktora sluzy do konfigurowania stanu naszych komponentow, przez np. pobieranie danych z LS lub z bazy danych

  useEffect(() => {
    // const todosFromLS = localStorage.getItem('todos');

    // if(todosFromLS) {
    //   setTodos(JSON.parse(todosFromLS))
    // }
    fetch('http://localhost:5000/todos')
      .then(res => res.json())
      .then(data => {
        // po otrzymaniu danych z BE potrzebuje uzyc funkcji do zmieniania stanu odpowiedzialnego za tablice wyswietlana
        setTodos(data);
      })
  }, []);

  // [] oznacza, ze ta funkcja odpali sie tylko raz, od razu po pierwszym zaladowaniu komponentu
  // jesli w tej tablicy, wpiszemy jakas zmienna, to funkcja useEffect odpali sie wtedy, kiedy ta zmienna sie zmieni.


  // 1. Eventy w React

  // JS -> React
  // click - onClick
  // submit - onSubmit
  // ??? - onChange - uzywany w Reactcie do inputow. Dzieki temu React moze sledzic wartosc inputa (wynika to z tego ze w React nie lapiemy elementow)

  const handleClick = () => {
    // Jesli uzywamy funkcji do zmiany stanu, to w srodku przekazujemy nowy stan
    // setInputValue('Damian :)')

    setTodos([]);
    localStorage.removeItem('todos');
  }

  const postTodo = (todoToSend) => {
    fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todoToSend)
    })
  }

  // Tak samo jak w zwyklym JS, funkcja ktora jest odpalana przez dane zdarzenie, moze otrzymac informacje o evencie pod nazwa event
  const handleSubmit = (event) => {
    event.preventDefault();

    // tutaj ustalamy, ze jesli wartosc jest mniej niz 2 znaki, to wyswietl error
    if(inputValue.length <= 2) {
      setIsTaskNameError(true);

      // W JS jesli zapiszemy slowo kluczowe return, to w tym momencie JS wychodzi z funkcji i nie wykonuje dalszej czesci kodu
      return;
    }

    // jesli chce sie dostac do wartosci inputa w funkcji submit, musze skorzystac ze stanu
    // console.log(inputValue);

    // - Potrzebujemy ustawic nowa wartosc zadania wyswietlonego, uzywajac zmiennej stanowej wartosci inputa
    // setTodoTask(inputValue)

    const newTodo = {
      id: uuidv4(),
      message: inputValue
    }

    // tutaj potrzebuje dodac nowy element (obiekt newTodo) do tablicy todos, ktora jest sterowana przez Reacta

    const newTodos = todos.concat(newTodo)
    // todos.push(newMessage) // to jest to samo co linijka powyzej, ale metoda concat nie modyfikuje tablicy wejsciowej. To jest kwestia dobrych praktyk :)

    // modyfikujemy tablice, zawierajaca wyswietlane todosy :)
    setTodos(newTodos);
    // localStorage.setItem('todos', JSON.stringify(newTodos));

    // postTodo jest to funkcja odpowiedzialna za wyslanie nowego TODO na serwer
    postTodo(newTodo)

    // Czyszczenie inputa
    // Potrzebuje zmienic wartosc stanu inputa, na pusty string
    setInputValue('');

    // Czyszczenie bledow walidacyjnych
    setIsTaskNameError(false);
  }

  const handleInputChange = (event) => {
    // - zeby dostac sie do tego, co zostalo wpisane do formularza, potrzebujemy skorzystac z event.target.value
    // - potrzebuje przekazac obecna wartosc inputa, do zmiennej trzymajacej stan inputa
    setInputValue(event.target.value)
  }

  const handleTodoRemove = (idToRemove) => {
    const filteredTodos = todos.filter(todo => {
      return todo.id !== idToRemove
    })

    setTodos(filteredTodos);
    // localStorage.setItem('todos', JSON.stringify(filteredTodos));
    removeTodo(idToRemove);
  }

  const removeTodo = (idToRemove) => {
    fetch(`http://localhost:5000/todos/${idToRemove}`, {
      method: 'DELETE'
    })
  }

  // 2. State (Stan komponentu)
  // - Stan jest potrzebny do sledzenia zmiennych, ktore zmieniaja sie w czasie np:
    //  * Lista zadan - poczatkowa jest [] a potem jest to tablica obiektow
    // * Wartosc inputa - poczatkowa wartosc jest '', natomiast kazde klikniecie klawiaury, zmienia zawartosc inputa

  // - Zeby skorzystac ze stanu, potrzebujemy zaimportowac funkcje useState z Reacta

  // inputValue - zmienna trzymajaca obecna wartosc stanu
  // setInputValue - jest to funkcja, ktora musimy uzyc, jesli chcemy zmienic stan

  // useState('') -> '' oznaczaja wartosc poczatkowa zmiennej ze stanem

  // let inputValue = ''
  // const setInputValue = (newValue) => {
  //   inputValue = newValue;
  // }
  const [inputValue, setInputValue] = useState('');
  // To jest przypadek, jak bysmy chcieli miec dwa inputy, czyli potrzebujemy 2 zmiennych trzymajacych stan
  // const [inputTodoValue, setTodoInputValue] = useState('');
  // const [inputMessageValue, setMessageInputValue] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>Hello React </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Task Name
              <input type="text" value={inputValue} onChange={handleInputChange}></input>
            </label>
            {/* w Reactcie, walidacje sie robi tak, ze HTML wstawia sie od razu do komponentu, natomiast w stanie trzymamy informacje, czy powinnismy wyswietlic error czy nie */}

            {/* jesli komponent zwraca null, to oznacza ze sie nie wyswietli */}
            {
              isTaskNameError
                ? <p className="error">Pole Task Name musi byc dluzsze niz 2 znaki.</p>
                : null
            }
            {/* Istnieje mozliwosc zapisu tego w formacie && */}

            {/* {
              isTaskNameError && <p className="error">Pole Task Name musi byc dluzsze niz 2 znaki.</p>
            } */}
          </div>

          <button type="submit">Wyslij</button>
        </form>

        <ul>
          {/* To jest petla map, za pomoca ktorego wyswietlamy elementy z tablicy w React */}
          {
            todos.map(todo => {
              // Atrybut key jest to atrybut wymagany przy renderowaniu listy. Jest on potrzebny Reactowi zeby okreslic, ktory element jest wyswietlany/klikany/zmieniany. Wazne: atrybut ID powinien byc unikalny, tzn. nie moze sie dublowac
              return (
                <li key={todo.id}>
                  {todo.message}
                  {/* jesli uruchomimy w petli pusta funkcje strzalkowa i w parametrze przekazemy np. id, to w momencie wywolania tego eventu, bedziemy mieli dostep do aktualnego id */}
                  <button onClick={() => handleTodoRemove(todo.id)}>X</button>
                </li>
              )
            })
          }
        </ul>
        <button onClick={handleClick}>Remove all todos</button>
      </header>
    </div>
  );
}

export default App;
