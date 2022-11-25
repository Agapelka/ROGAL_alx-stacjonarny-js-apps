import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  signInWithEmailAndPassword } from "firebase/auth";

import { auth } from 'utils/firebase'
import MainTemplate from 'components/templates/MainTemplate/MainTemplate';

function LoginPage() {
  const [emailInputValue, setEmailInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [isLoginError, setIsLoginError] = useState(false)

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmailInputValue(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPasswordInputValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, emailInputValue, passwordInputValue)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.log(error);
        setIsLoginError(true)
      })

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