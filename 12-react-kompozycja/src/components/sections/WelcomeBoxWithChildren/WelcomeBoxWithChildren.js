import './WelcomeBoxWithChildren.css';

// to co wyroznia komponent od zwyklej funkcji jest to, ze komponent zwraca kawalek HTML (JSX)


// Jesli chcemy skorzystac z atrybutow przekazywanych, potrzebujemy wpisac props do argumentu
function WelcomeBoxWithChildren(props) {
  // Jesli chce odebrac jakies informacje przekazane przy wywolaniu, potrzebuje skorzystac z wbudowanego w komponent obiektu Props
  // console.log(props);

  // W reactcie moge dynamicznie dodawac klase do elementu uzywajac grawisow przy className
  return (
    // Mozemy zrobic warunek, ze jesli w props przyjdzie informacja, ze komponent ma byc podswietlony, to mozemy dodac druga klase
    <div className={`welcome-box ${props.highlighted ? 'highlighted' : ''}`}>
      {/* props.children jest to specjalny props, oznaczajacy cala tresc, ktora jest umieszczona pomiedzy znacznikiem otwierajacym i zamykajacym */}
      {props.children}
    </div>
  )
}

// zasada jest taka, ze komponenty powinny byc w osobnych plikach, czyli mamy 1 komponent per plik. To oznacza ze powinnismy eksportowac komponenty jako export default
export default WelcomeBoxWithChildren