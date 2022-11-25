import { useState, useEffect, createContext } from 'react';
import { onAuthStateChanged } from "firebase/auth";

import { auth } from 'utils/firebase'


// Context jest to magazyn, do ktorego mozemy zapisywac jakies dane i z niego odczytywac
export const GlobalContext = createContext();

// Context sklada sie z 2 czesci

// Provider - jest odpowiedzialny za przekazywanie wartosci
// Consumer - jest odpowiedzialny za pobieranie wartosci

const GLOBAL_STATE = {
  theme: 'light',
  user: null,
  isUserLoading: true
}

function GlobalProvider(props) {
  // To jest taki sam useState jaki uzywalismy przy komponentach, z ta roznica ze tutaj wartoscia poczatkowa jest obiekt
  const [state, setState] = useState(GLOBAL_STATE);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setState({
        ...state,
        user: user ?? null,
        isUserLoading: false
      })
    })
  }, [])

  const handleThemeChange = () => {
    const opositeTheme = state.theme === 'light' ? 'dark' : 'light'
    // Jesli bym potrzebowal zmienic jakas wartosc w tym obiekcie, to potrzebowalbym nadpisac interesujaca mnie wartosc

    // Jesli potrzebuje zmienic wartosci zmiennych w obiekcie, to niestety nie moge tego zrobic poprzez zmiane klucza. Wynika to z tego, ze jesli zmodyfikujemy obecny obiekt, to JS nie bedzie widzial zmian.

    // state.theme = 'dark'; // lub light
    // setState(state);

    // W zwiazku z tym, potrzebujemy zrobic to za pomoca kopii za pomoca spread operator ES6
    // uzycie ...state spowoduje skopiowanie wartosci obecnego stanu do zmiennej newState, a wstawienie nowej wartosci theme, spowoduje nadpisanie tej konkretnej zmiennej w obiekcie

    // Ten sposob zapisu mozna potraktrowac jako pattern na zmiane wlasciwosci obiektu
    const newState = {
      ...state,
      theme: opositeTheme
    }

    setState(newState);
  }


  // Potrzebuje przekazac do moich komponentow, nie tylko obecny stan aplikacji, ale tez funkcje, ktore sa odpowiedzialne za zmiane tego stanu

  // Optymalizacja JS: jesli klucze i wartosci to sa zmienne i maja takie same nazwy, mozemy opuscic wartosci
  const stateAndFunctionToSend = {
    state,
    handleThemeChange
  }

  // Zeby moc odbierac dane z mojego stanu globalnego, potrzebuje owrapowac moj komponent w Context.Provider

  // Context.Provider jest to komponent udostepniany przez React Context

  // atrybut value przy Providerze sluzy do przekazywania wartosci do Consumerow (dowolnych komponentow, ktore beda chcialy uzyc tej informacji)

  // Potrzebujemy przekazac state zamiast GLOBAL_STATE, poniewaz my bedziemy dokonywac zmian w tym obiekcie
  return (
    <GlobalContext.Provider value={stateAndFunctionToSend}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider



// CSS Modules - lokalne pliki CSS
// Env variables - jak bezpiecznie trzymac dane dostepowe do aplikacji
// Wlasne hooki
// Pisanie aplikacji :)
