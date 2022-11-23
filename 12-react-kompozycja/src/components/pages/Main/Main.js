// w Create React App podzial na pliki css jest tylko dobra praktyka.
// w rzeczywistosci, Create React App (CRA) i tak laczy wszystkie css w jedno i wysyla to do przegladarki

// *. Istnieje mozliwosc tworzenia lokalnych plikow CSS za pomoca tzw. CSS Modules

import './Main.css';
import WelcomeBox from '../../sections/WelcomeBox/WelcomeBox';
import WelcomeBoxWithChildren from '../../sections/WelcomeBoxWithChildren/WelcomeBoxWithChildren';

import Title from '../../atoms/Title/Title';
import TitleWithChildren from '../../atoms/TitleWithChildren/TitleWithChildren';

function Main() {
  return (
    <div>
      {/* Stworz komponent TitleWithChildren, ktory bedzie renderowal dynamiczną treść */}

      <Title text="Welcome in the app" isRed />

      <TitleWithChildren>
        <p>Welcome in the app from <i>TitleWithChildren</i> </p>
      </TitleWithChildren>

      {/* Zeby wywolac komponent, musimy go uzyc tak jak znacznik HTML */}

      {/* Jesli chcemy przekazac jakies informacje do komponentu, potrzebujemy to wpisac jak atrybuty HTML */}
      <WelcomeBox
        title="Welcome on the HomePage"
        description="Dzisiaj jest sroda i jest zimno na dworze"
      />
      <WelcomeBox
        title="Kurs ALX jest fajny"
        description="Dzisiaj jest sroda i jest zimno na dworze2"
        highlighted={true}
      />

      {/* Dzieki takiej konstrukcji, moge dynamicznie dorzucac tresc do mojego komponentu */}
      <WelcomeBoxWithChildren>
        <h2>Dynamic content</h2>
        <p>Dynamic description with any text</p>
        <div>
          <i>Some tekst :)</i>
        </div>
      </WelcomeBoxWithChildren>

    </div>
  );
}

export default Main;
