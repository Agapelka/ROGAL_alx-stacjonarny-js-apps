import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { GlobalContext } from 'contexts/global';

import Button from 'components/atoms/Button/Button';

import './Footer.css';

function Footer() {
  const { state, handleThemeChange } = useContext(GlobalContext);

  return (
    <footer className={state.theme === 'dark' ? 'dark-theme-footer': ''}>
      <nav>
        <ul>
          <li>
            <Link to="/">Strona glowna</Link>
          </li>
          <li>
            <Link to="/about">O mnie</Link>
          </li>
        </ul>
      </nav>
      {/* Jesli zdefiniujemy w contextcie funkcje do zmiany stanu, to potrzebujemy ja wywolac bezposrednio w komponencie */}
      <Button text="Zmien theme" onClick={handleThemeChange}/>
    </footer>
  )
}

export default Footer;