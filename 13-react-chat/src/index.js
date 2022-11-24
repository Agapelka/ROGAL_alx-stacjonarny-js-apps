import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import 'styles/index.css';

import HomePage from 'components/pages/HomePage/HomePage';
import EditPage from 'components/pages/EditPage/EditPage';
import AboutPage from 'components/pages/AboutPage/AboutPage';

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
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

// RouterProvider jest to komponent stworzony przez react-router-dom, ktory przyjmuje jako props router, nasz obiekt konfiguracyjny

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


