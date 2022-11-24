import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          {/* Jesli chcemy zmienic zawartosc strony, bez odswiezania jej calkowicie, potrzebujemy uzyc wbudowanego komponentu Link w react-router-dom. Powoduje on odswiezenie tylko zawartosci diva, do ktorego laduje sie caly kod reactowy. Roznica pomiedzy Link a element a jest taka, ze Link ma atrybut to, zamiast href */}
          <Link to="/">Strona główna</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation