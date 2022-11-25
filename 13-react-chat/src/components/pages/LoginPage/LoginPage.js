import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { GlobalContext } from 'contexts/global';
import MainTemplate from 'components/templates/MainTemplate/MainTemplate';

function LoginPage() {
  const [emailInputValue, setEmailInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [isLoginError, setIsLoginError] = useState(false)

  const navigate = useNavigate();
  // Funkcja login musi byc zdefiniowana w contextcie, poniewaz user musi byc widoczny na wszystkich podstronach
  const { login } = useContext(GlobalContext);

  const handleEmailChange = (event) => {
    setEmailInputValue(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPasswordInputValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // jesli uzytkownik podal dobry login i haslo, to wpusc uzytkownika do srodka

    const user = login(emailInputValue, passwordInputValue);

    if(user) {
      navigate('/');
    } else {
      setIsLoginError(true)
    }
  }

  return (
    <MainTemplate>
      <h1>Login into chat</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Email Adress
          <input value={emailInputValue} onChange={handleEmailChange}></input>
        </label>
        <label>
          Password
          <input type="password" value={passwordInputValue} onChange={handlePasswordChange}></input>
        </label>
        {isLoginError && <p>Nieprawidlowy login lub haslo</p>}
        <button type="submit">Send</button>
      </form>
    </MainTemplate>
  )
}

export default LoginPage;