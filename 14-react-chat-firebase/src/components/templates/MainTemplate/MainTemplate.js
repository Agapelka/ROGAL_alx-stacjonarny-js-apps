import { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'

import { GlobalContext } from 'contexts/global';
// Templatki sa to reuzywalne layouty naszej aplikacji, zawierajace zazwyczaj nawigacje, footer i dynamiczna tresc
import Footer from "components/sections/Footer/Footer"
import Navigation from "components/sections/Navigation/Navigation"

function MainTemplate(props) {
  const { state } = useContext(GlobalContext);
  const navigate = useNavigate();
  // zeby za pomoca react-router-dom, dowiedziec sie jaka jest obecna strona, potrzebujemy uzyc funkcji useLocation
  const location = useLocation();

  useEffect(() => {
    // jesli uzytkownik juz sie nie laduje i nie zostal zaladowany przez LS i nie jestem na podstronie login, to wroc mnie do podstrony login
    if(!state.isUserLoading && !state.user && (location.pathname !== '/login' || location.pathname !== '/register')) {
      navigate('/login');
    }

    if(!state.isUserLoading && state.user && (location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/');
    }

    // tutaj potrzebuje dopisac state.isUserLoading, zeby useEffect wykonal sie drugi raz, jak uzytkownik zostanie zaladowany. W ten sposob jestem w stanie sprawdzic, czy uzytkownik jest zalogowany czy nie
  }, [state.isUserLoading])

  if(state.isUserLoading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <Navigation />
      {props.children}
      <Footer />
    </div>
  )
}

export default MainTemplate