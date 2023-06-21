import { useEffect, useState } from 'react';
import logo from './422px-Blackjack.svg.png';
import { Dealer, getValueFromCards } from './util/Blackjack';
import deck, { IFullCard } from './data/cardOptions';
import Buttons from './components/Buttons';
import Cards from './components/Cards';
import { Person } from './interfaces';
import './App.css';


function App() {

  const dealer = new Dealer();

  // Cards
  const [currDeck, setCurrDeck] = useState(deck);

  const [cards, setCards] = useState<IFullCard[]>([]);
  const [dealerCards, setDealerCards] = useState<any[]>([]);

  // Card Values
  const [userValue, setUserValue] = useState(0);
  const [dealerValue, setDealerValue] = useState(0);

  // Playing state
  const [isBlackjack, setIsBlackJack] = useState(false);
  const [hasDealt, setHasDealt] = useState(false);
  const [hasStayed, setHasStayed] = useState(false);
  const [dealingForDealer, setDealingForDealer] = useState(false);

  // Round result
  const [didPlayerLose, setDidPlayerLose] = useState(false);
  const [didPlayerWin, setDidPlayerWin] = useState(false);
  const [didDealerWin, setDidDealerWin] = useState(false);


  // Check for user states
  useEffect(() => {
    if (userValue === 21) {
      setIsBlackJack(true);
      setWinner(Person.User);
      return;
    }
    if (userValue > 21) {
      setWinner(Person.Dealer);
      return;
    }
  }, [userValue]);

  // useEffect should be waiting to check if dealer < 21 && dealer < user && hasStayed
  // keep hitting until dealer either a) goes over 21 and loses or b) goes higher than the user

  const handleTimer = () => {
    // keep hitting until dealer beats user or goes over 21
    console.log(`Hitting as Dealer. Dealer: ${dealerValue} v. Player: ${userValue}`);
    const { cards: hitCard, updatedDeck } = dealer.dealCards(currDeck, 1);

    console.log(`dealer drew a ${hitCard[0].name} of ${hitCard[0].suit}`)

    const mergedCards = [...dealerCards, ...hitCard]

    // determine value of all dealer's cards
    const new_dealerValue = getValueFromCards(mergedCards);
    console.log('dealer is now at: ', new_dealerValue);
    setDealerValue(new_dealerValue);

    // update dealer's current hand and the deck
    setDealerCards(mergedCards);
    setCurrDeck(updatedDeck);

    if (dealerValue > 21) {
      setWinner(Person.User);
    }
  };




  useEffect(() => {


    if (dealerValue > 21) {
      setWinner(Person.User);
      return;
    } else if (dealerValue === 21) {
      if (userValue > 21) {
        setWinner(Person.Dealer);
        return;
      } else if (userValue === 21) {
        setWinner(Person.Nobody);
        return;
      } else if (userValue < 21) {
        setWinner(Person.Dealer);
        return;
      }
    } else if (dealerValue < 21) {

      // if dealerValue is less than 21, the scenarios are: 

      // dealer has more than player. --> WIN 
      // dealer is equal to player --> keep playing (unless 21, then nobody wins)
      // dealer has less than player --> keep going

      if (dealerValue === userValue && hasStayed) {
        // continue playing...
        const timeoutFunction = setInterval(handleTimer, 2000)
        return () => clearInterval(timeoutFunction);
      }
      else if (dealerValue < userValue && hasStayed) {
        // console.log('we are in the useEffect!')

        const timeoutFunction = setInterval(handleTimer, 2000)
        return () => clearInterval(timeoutFunction);
      }
      else if (dealerValue > userValue && hasStayed) {
        console.log(`DEALER WINS with ${dealerValue} (player had ${userValue}) AFTER PLAYING AFTER STAY!`)
        setWinner(Person.Dealer);
        return;
      }
    }
  }, [dealerValue, hasStayed, currDeck, dealerCards, userValue])




  function dealCards() {
    const { cards, updatedDeck } = dealer.dealCards(currDeck, 2);
    // console.log(cards);
    setCards(cards);

    // now working off that deck and removing 2 more cards
    const { cards: dealer_cards, updatedDeck: dealer_upd_deck } = dealer.dealCards(updatedDeck, 2);
    setDealerCards(dealer_cards);
    setCurrDeck(dealer_upd_deck);

    // count for player and dealer 
    const playerValue = getValueFromCards(cards);
    setUserValue(playerValue);
    const dealerValue = getValueFromCards(dealer_cards);
    setDealerValue(dealerValue);

    setHasDealt(true);
  }

  // ========================================
  // Player functions
  // ========================================
  function hit() {
    const { cards: hitCard, updatedDeck } = dealer.dealCards(currDeck, 1);
    console.log(cards);

    // we need to add the card to the current cards
    const mergedCards = [...cards, ...hitCard]
    setCards(mergedCards);
    setCurrDeck(updatedDeck);

    // update user value
    const val = getValueFromCards(mergedCards);
    setUserValue(val);
  }

  function stay() {
    setHasStayed(true);

    // go on to let the dealer play
    playAsDealer();
  }
  // ========================================
  // ========================================


  function playAsDealer() {
    console.log('playAsDealer()')
    setDealingForDealer(true);
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
      console.log('dealer value is neither greater than 21 nor greater than user\'s value')
    }
  }



  function setWinner(person: Person) {
    if (person === Person.User) {
      setDidDealerWin(false);
      setDidPlayerWin(true);
      setDidPlayerLose(false);
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
    console.log('----> clearRound()')
    setDealingForDealer(false);

    setTimeout(() => {
      setDidDealerWin(false);
      setDidPlayerLose(false);
      setDidPlayerWin(false);
      setUserValue(0);
      setDealerValue(0);
      setCards([]);
      setDealerCards([]);
      setCurrDeck(deck);

      setHasDealt(false);
      setIsBlackJack(false);
      setHasStayed(false);
    }, 2000)
  }





  return (
    <div className="App container container-fluid">

      <header
        className="App-header"
      >

        <img src={logo} className="App-logo" alt="logo" />

        {didPlayerWin && <div className="bg-success rounded">You win!</div>}
        {dealingForDealer && <div className="bg-info rounded p-1">Dealing for dealer...</div>}

        <Buttons
          hasDealt={hasDealt}
          hasStayed={hasStayed}
          dealCards={dealCards}
          hit={hit}
          stay={stay}
        />


        <div className="row">
          <div className="col">

            {didPlayerLose && <div className="bg-danger" style={{ visibility: 'hidden' }}>A</div>}
            {isBlackjack && <div className="bg-success rounded">Blackjack!</div>}

            <h2>Your cards</h2>
            <div>{userValue.toString()}</div>
            <Cards cards={cards} />
          </div>


          <div className="col">
            {didDealerWin && <div className="bg-warning rounded">Dealer wins!</div>}

            <h2>Dealer's cards</h2>
            <div>{dealerValue.toString()}</div>

            <Cards cards={dealerCards} />

          </div>
        </div>


      </header>
    </div>
  );
}

export default App;
