import React from 'react';
// import logo from './logo.svg';
import logo from './422px-Blackjack.svg.png';
import './App.css';
import Deck from './components/Deck';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />

        <h2>Your cards</h2>
        <div>Here are your cards dealt:</div>

        <h2>Dealer's cards</h2>
        <div>Here are the Dealer's cards:</div>

        <Deck />




      </header>
    </div>
  );
}

export default App;
