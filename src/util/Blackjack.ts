import deck, { IFullCard } from "../data/cardOptions";
import { DeckType } from "../interfaces";



export class Dealer {

    // get two cards from deck from random

    public dealCards(currDeck: DeckType = deck, numCards: number) {
        const cards = this.getRandomCards(numCards, currDeck);

        const updatedDeck = this.removeCards(cards, currDeck);

        return { cards, updatedDeck };
    }

    private getRandomCards(numCards: number, deck: DeckType) {
        let cards: IFullCard[] = [];
        for (let i = 0; i < numCards; i++) {
            let randomCard = this.getRandomCard(deck);
            cards.push(randomCard);
        }
        return cards;
    }

    private getRandomCard(deck: DeckType) {
        const length = deck.length;
        const randValue = getRandomNum(length);
        return deck[randValue];
    }

    private removeCards(cards: IFullCard[], deck: DeckType) {

        let arr = [];

        // we only want to push cards that are not one of the cards we pass in
        for (let card of deck) {
            if (cards.includes(card) === false) {
                arr.push(card);
            }
        }

        return arr;
    }
}


function getRandomNum(max: number) {
    let num = Math.floor(Math.random() * max - 0 + 1);
    return num;
}