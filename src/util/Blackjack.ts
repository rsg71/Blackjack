import deck, { IFullCard } from "../data/cardOptions";
import { DeckType } from "../interfaces";

export class Dealer {
   
    public dealCards() {
        // get two cards from deck from random
        const cards = this.getRandomCards(2, deck);
        return cards;
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

        function getRandomNum(max: number) {
            let num = Math.floor(Math.random() * max - 0 + 1);
            return num;
        }

        const randValue = getRandomNum(length);
        return deck[randValue];
    }
}