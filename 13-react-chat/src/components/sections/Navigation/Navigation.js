import { useContext } from 'react';
import { GlobalContext } from 'contexts/global';
import { useNavigate, Link } from 'react-router-dom';

import './Navigation.css';
import Button from 'components/atoms/Button/Button';

function Navigation() {
  // Bez destrukturyzacji

  // const globalState = useContext(GlobalContext);
  // console.log(globalState.theme)

  // Destukturyzacja

  // Destrukturyzacja sluzy do wydobywania wartosci z obiektow (lub tablic) od razu przy wywolaniu
  const { state, handleThemeChange, logout } = useContext(GlobalContext)

  // navigate jest to metoda z react-router-dom umozliwiajaca przekierowanie na inna strone bezposrednio w pliku JS (ekwiwalent window.href)
  const navigate = useNavigate();

  // Zadanie na teraz:
  // - Zrob w Headerze button, ktory bedzie zmienial theme
  // - Zrob obsluge theme w footerze, tak aby jak zmienna jest ustawiona na dark, Footer rowniez byl ciemny

  const handleLogout = () => {
    logout()
    navigate('/login');
  }


  return (
    <nav className={state.theme === 'dark' ? 'dark-theme': ''}>
      <ul>
        <li>
          {/* Jesli chcemy zmienic zawartosc strony, bez odswiezania jej calkowicie, potrzebujemy uzyc wbudowanego komponentu Link w react-router-dom. Powoduje on odswiezenie tylko zawartosci diva, do ktorego laduje sie caly kod reactowy. Roznica pomiedzy Link a element a jest taka, ze Link ma atrybut to, zamiast href */}
          <Link to="/">Strona główna</Link>
        </li>
        {
          !state.user && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )
        }
      </ul>
      <Button text="Zmień theme" onClick={handleThemeChange}/>
      {
        state.user && <Button text="Wyloguj" onClick={handleLogout} />
      }
      {
        state.user && (
          <div>
            <p> Hello {state.user.name} </p>
          </div>
        )
      }
    </nav>
  )
}

export default Navigation