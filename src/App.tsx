import { useState } from 'react';
import logo from './422px-Blackjack.svg.png';
import './App.css';
import { Dealer } from './util/Blackjack';
import deck, { IFullCard } from './data/cardOptions';
import Card from './components/Card';

function App() {

  const dealer = new Dealer();

  const [cards, setCards] = useState<IFullCard[]>([]);
  const [dealerCards, setDealerCards] = useState<IFullCard[]>([]);


  const [userValue, setUserValue] = useState(0);
  const [dealerValue, setDealerValue] = useState(0);

  const [currDeck, setCurrDeck] = useState(deck);
  // we need to start by dealing with the default deck; then each subsequent deal should draw from the curent deck;



  function dealCards() {
    const { cards, updatedDeck } = dealer.dealCards(currDeck, 2);
    console.log(cards);
    setCards(cards);


    // now working off that deck and removing 2 more cards

    const { cards: dealer_cards, updatedDeck: dealer_upd_deck } = dealer.dealCards(updatedDeck, 2);
    setDealerCards(dealer_cards);
    setCurrDeck(dealer_upd_deck);


    // count for player and dealer 
    let playerValue = getValueFromCards(cards);
    setUserValue(playerValue);

    let dealerValue = getValueFromCards(dealer_cards);
    setDealerValue(dealerValue);

  }

  function incrementValue(newValue: number) {
    setUserValue(userValue => userValue + newValue);
  }


  function getValueFromCards(cards: IFullCard[]) {
    let total = 0;
    for (let card of cards) {
      total += card.value;
    }
    return total;
  }


  function hit() {
    const { cards: hitCard, updatedDeck } = dealer.dealCards(currDeck, 1);
    console.log(cards);

    // we need to add the card to the current cards
    const mergedCards = [...cards, ...hitCard]
    setCards(mergedCards);
    setCurrDeck(updatedDeck);
  }

  function stay() {

  }

  return (
    <div className="App container">


      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />
        <h5>currDeck length: {currDeck.length}</h5>


        <div className="row">
          <div className="col">
            <button className="btn btn-secondary" onClick={dealCards}>Deal</button>
          </div>
          <div className="col">
            <button className="btn btn-secondary" onClick={() => hit()}>Hit</button>
          </div>
          <div className="col">
            <button className="btn btn-secondary" onClick={() => stay()}>stay</button>
          </div>
        </div>



        <div className="row">
          <div className="col-lg-6">
            <h2>Your cards</h2>
            <div>{userValue.toString()}</div>
            <div>
              {cards.map(card => (
                <div>
                  <Card card={card} />
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6">
            <h2>Dealer's cards</h2>
            <div>{dealerValue.toString()}</div>
            {dealerCards.map(card => (
              <div>
                <Card card={card} />
              </div>
            ))}
          </div>
        </div>


      </header>
    </div>
  );
}

export default App;
