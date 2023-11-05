import { IFullCard, isFaceCard } from "../data/cardOptions"
import { CardEnum, SuitEnum } from "./enums"

export function getSuitIcon(suit: SuitEnum): string {

    if (suit === SuitEnum.CLUBS) {
        return '♣'
    } else if (suit === SuitEnum.DIAMONDS) {
        return '♦'
    } else if (suit === SuitEnum.HEARTS) {
        return '♥'
    } else if (suit === SuitEnum.SPADES) {
        return '♠'
    } else {
        return ''
    }
}

export function formatColor(suit: SuitEnum) {
    if (suit === SuitEnum.CLUBS || suit === SuitEnum.SPADES) {
        return 'black'
    } else if (suit === SuitEnum.DIAMONDS || suit === SuitEnum.HEARTS) {
        return 'red'
    } else {
        return ''
    }
}

export function formatDisplayName(card: IFullCard) {
    if (isFaceCard(card) || card.name === CardEnum.Ace) {
        return card.name;
    } else {
        return card.value;
    }
}
