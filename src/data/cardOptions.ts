import { CardEnum, SuitEnum } from "../util/enums";

export const cardOptions = [
    {
        name: CardEnum.Two,
        numeric: 2
    },
    {
        name: CardEnum.Three,
        numeric: 3
    },
    {
        name: CardEnum.Four,
        numeric: 4
    },
    {
        name: CardEnum.Five,
        numeric: 5
    },
    {
        name: CardEnum.Six,
        numeric: 6
    },
    {
        name: CardEnum.Seven,
        numeric: 7
    },
    {
        name: CardEnum.Eight,
        numeric: 8
    },
    {
        name: CardEnum.Nine,
        numeric: 9
    },
    {
        name: CardEnum.Ten,
        numeric: 10
    },
    {
        name: CardEnum.Jack,
        numeric: 10
    },
    {
        name: CardEnum.Queen,
        numeric: 10
    },
    {
        name: CardEnum.King,
        numeric: 10
    },
    {
        name: CardEnum.Ace,
        numeric: 11
    },

]



const suits = [SuitEnum.CLUBS, SuitEnum.DIAMONDS, SuitEnum.SPADES, SuitEnum.HEARTS]


export interface IFullCard {
    name: CardEnum,
    value: number,
    suit: SuitEnum
}


function createCardsForEachSuit(): IFullCard[] {

    let allCards: IFullCard[] = [];

    // create quarter deck for each suit
    // then push quarter deck to allCards
    for (let i = 0; i < suits.length; i++) {
        let suitType = suits[i];

        cardOptions.forEach(card => {
            let newCard: IFullCard = {
                name: card.name,
                value: card.numeric,
                suit: suitType
            }
            allCards.push(newCard);
        })
    }

    return allCards;
}


let deck = createCardsForEachSuit();


export default deck;


export const fruits = ['apple', 'mango', 'peach', 'watermelon', 'raspberry', 'kiwi']