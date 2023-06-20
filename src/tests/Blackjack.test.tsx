import deck from "../data/cardOptions";
import { Dealer } from "../util/Blackjack"

describe('A function', () => {

    const dealer = new Dealer();

    it('should deal cards and remove them from the deck', () => {

        let { cards, updatedDeck } = dealer.dealCards(deck, 2);

        expect(updatedDeck.length).toBe(50);
        expect(cards.length).toBe(2);

    })

    
})
