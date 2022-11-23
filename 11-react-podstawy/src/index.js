import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import Chat from './Chat';

const root = ReactDOM.createRoot(document.getElementById('root'));

// JSX Podstawy
// 1. Wstawianie zmiennych jako wezlow HTML

// wezly HTML moga byc w jednej linii bez nawiasow, lub w wielu liniach z nawiasami
// const element = <h1> Hello React </h1>

const element = (
  <h1>
    Hello React
  </h1>
)

// 2. Wstawianie funkcji

const calculate = (a, b) => a + b;

// 3. Wstawianie atrybutow

// class = className

// wazna rzecz: wezly HTML zapisane do zmiennych lub zwracane, zawsze musza miec tylko i wylacznie jeden znacznik otwierajacy/zamykajacy
const element2 = (
  // Musi byc wrapper. Moze to byc dowolny tag html lub tzw znacznik pusty (tzw React Fragment)
  <>
    <h1 className="title" id="myTitle">Cześć element2</h1>
    <h1 className="title" id="myTitle">Cześć element2</h1>
  </>
)



root.render(
  <React.StrictMode>
    {/* Jesli chcemy uzyc naszych zmiennych, potrzebuje uzyc {} (podobnie jak template string tylko bez znaku $) */}
    {/* {element} {calculate(2, 2)}
    {element2} */}

    {/* Jesli chcemy uzyc komponentu, to wywolujemy go tak jak znacznik HTML */}
    {/* <App /> */}
    <Chat />
  </React.StrictMode>
);
