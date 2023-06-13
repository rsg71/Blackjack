import { useState } from 'react';
import logo from './422px-Blackjack.svg.png';
import './App.css';
import { Dealer } from './util/Blackjack';
import { IFullCard } from './data/cardOptions';
import Card from './components/Card';

function App() {

  const dealer = new Dealer();

  const [cards, setCards] = useState<IFullCard[]>([]);
  const [dealerCards, setDealerCards] = useState<IFullCard[]>([]);


  function dealCards() {
    const cards = dealer.dealCards();
    console.log(cards);
    setCards(cards);

    const dealer_cards = dealer.dealCards();
    setDealerCards(dealer_cards);
  }

  return (
    <div className="App">
      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />

        <button style={{ fontSize: 'larger' }} onClick={dealCards}>Deal</button>

        <h2>Your cards</h2>
        <div>Here are your cards dealt:</div>
        <div>
          {cards.map(card => (
            <div>
              <Card card={card} />
            </div>
          ))}
        </div>

        <h2>Dealer's cards</h2>
        <div>Here are the Dealer's cards:</div>

        {dealerCards.map(card => (
          <div>
            <Card card={card} />
          </div>
        ))}


      </header>
    </div>
  );
}

export default App;
