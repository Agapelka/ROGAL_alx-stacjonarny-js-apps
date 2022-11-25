import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import 'styles/index.css';

import GlobalProvider from './contexts/global';

import HomePage from 'components/pages/HomePage/HomePage';
import EditPage from 'components/pages/EditPage/EditPage';
import AboutPage from 'components/pages/AboutPage/AboutPage';
import LoginPage from 'components/pages/LoginPage/LoginPage';
import RegisterPage from 'components/pages/RegisterPage/RegisterPage';

// To jest obiekt konfiguracyjny routingu, ktory mowi nam na ktorej sciezce, ma odpalic ktory komponent
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/edit/:messageId',
    element: <EditPage />
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

// RouterProvider jest to komponent stworzony przez react-router-dom, ktory przyjmuje jako props router, nasz obiekt konfiguracyjny

root.render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>
);


