import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';

// import Main from './components/pages/Main/Main';
import TodoPage from './components/pages/TodoPage/TodoPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TodoPage />
  </React.StrictMode>
);