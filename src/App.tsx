import { useEffect, useState } from 'react';
import logo from './422px-Blackjack.svg.png';
import './App.css';
import { Dealer } from './util/Blackjack';
import deck, { IFullCard } from './data/cardOptions';
import Card from './components/Card';

function App() {

  enum Person {
    User = 'User',
    Dealer = 'Dealer',
    Nobody = 'Nobody'
  }

  const dealer = new Dealer();


  const [cards, setCards] = useState<IFullCard[]>([]);
  const [dealerCards, setDealerCards] = useState<IFullCard[]>([]);

  const [isBlackjack, setIsBlackJack] = useState(false);


  const [hasDealt, setHasDealt] = useState(false);
  const [hasStayed, setHasStayed] = useState(false);



  const [userValue, setUserValue] = useState(0);
  const [dealerValue, setDealerValue] = useState(0);

  const [currDeck, setCurrDeck] = useState(deck);
  // we need to start by dealing with the default deck; then each subsequent deal should draw from the curent deck;


  const [didPlayerLose, setDidPlayerLose] = useState(false);
  const [didDealerWin, setDidDealerWin] = useState(false);
  const [didPLayerWin, setDidPlayerWin] = useState(false);


  useEffect(() => {

    if (userValue === 21) {
      setIsBlackJack(true);
    }

    if (userValue > 21) {
      setWinner(Person.Dealer)
    }
  }, [userValue]);

  useEffect(() => {

    if (dealerValue > 21) {
      setWinner(Person.User);
    }
  }, [dealerValue])




  function dealCards() {
    const { cards, updatedDeck } = dealer.dealCards(currDeck, 2);
    // console.log(cards);
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

    setHasDealt(true);

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

    // update user value
    let val = getValueFromCards(mergedCards);
    setUserValue(val);
  }

  function stay() {
    setHasStayed(true);

    // go on to let the dealer play
    playAsDealer();
  }


  function playAsDealer() {
    console.log('playAsDealer()')
    // if user has chosen to "stay", dealer needs to play until they beat the user or go over 21


    // check if dealer has greater value than user
    // if they have, dealer wins

    const isDealerValGreater = dealerValue > userValue;
    if (isDealerValGreater && dealerValue <= 21) {
      setWinner(Person.Dealer);
    } else if (dealerValue > 21) {
      console.log('dealerValue > 21')
      setWinner(Person.User) // ✍ WE NEED TO HANDLE THIS EXCEPTION WHERE NOBODY WINS
    } else {
      // continue hitting until dealer value is greater than player, or dealer loses

      const handle = setInterval(() => {

        if (dealerValue === 21) {

          if (userValue !== 21) {
            setWinner(Person.Dealer);
          } else {
            clearRound();
          }
          clearInterval(handle);

        } else if (dealerValue > 21) {
          console.log('dealerValue > 21')
          setWinner(Person.User) // ✍ WE NEED TO HANDLE THIS EXCEPTION WHERE NOBODY WINS
          clearInterval(handle);
          
        } else if (dealerValue > userValue && dealerValue <= 21) {
          console.log('dealerValue > userValue && dealerValue <=21')

          // dealer wins
          setWinner(Person.Dealer);
          clearInterval(handle);
        } else if (dealerValue < userValue) {
          console.log('dealerValue < userValue')

          // keep hitting
          let { cards: hitCard, updatedDeck } = dealer.dealCards(currDeck, 1);
          let mergedCards = [...dealerCards, ...hitCard]

          setDealerCards(mergedCards);
          setCurrDeck(updatedDeck);

          let dealerValue = getValueFromCards(mergedCards);
          setDealerValue(dealerValue);

        } else {
          clearInterval(handle);
        }
      }, 2000)

    }
  }

  function setWinner(person: Person) {
    if (person === Person.User) {
      setDidDealerWin(false);
      setDidPlayerWin(true);
    } else if (person === Person.Dealer) {
      setDidDealerWin(true);
      setDidPlayerWin(false);
      setDidPlayerLose(true);
    } else if (person === Person.Nobody) {
      setDidDealerWin(false);
      setDidPlayerWin(false);
      setDidPlayerLose(false);
    }

    clearRound();
  }


  function clearRound() {
    setTimeout(() => {
      setDidDealerWin(false);
      setDidPlayerLose(false);
      setDidPlayerWin(false);
      setUserValue(0);
      setDealerValue(0);
      setCards([]);
      setDealerCards([]);
      setHasDealt(false);

      setHasStayed(false);
    }, 2000)
  }

  return (
    <div className="App container">


      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />
        <h5>currDeck length: {currDeck.length}</h5>


        {
          didPLayerWin && <div className="bg-success">You win!</div>
        }


        <div className="row">
          <div className="col">
            {!hasDealt &&
              <button className="btn btn-secondary" onClick={dealCards}>Deal</button>}
          </div>
          <div className="col">
            {hasDealt && !hasStayed &&
              <button className="btn btn-secondary" onClick={() => hit()}>Hit</button>}
          </div>
          <div className="col">
            {hasDealt && !hasStayed &&
              <button className="btn btn-secondary" onClick={() => stay()}>stay</button>}
          </div>
        </div>




        <div className="row">
          <div className="col-lg-6">
            {didPlayerLose && <div className="bg-danger" style={{ visibility: 'hidden' }}>A</div>}
            {isBlackjack && <div className="bg-success">Blackjack!</div>}
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
            {
              didDealerWin && <div className="bg-warning">Dealer wins!</div>
            }
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
