import { SuitEnum } from '../util/enums';
import { IFullCard } from '../data/cardOptions';


interface Props {
    card: IFullCard
}

export default function Card({ card }: Props) {


    function getSuitIcon(suit: SuitEnum) {

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

    function formatColor(suit: SuitEnum) {
        if (suit === SuitEnum.CLUBS || suit === SuitEnum.SPADES) {
            return 'black'
        } else if (suit === SuitEnum.DIAMONDS || suit === SuitEnum.HEARTS) {
            return 'red'
        } else {
            return ''
        }
    }

    function formatDisplayName(card: IFullCard) {
        if (card.value > 10 || card.value === 1) {
            return card.name
        } else {
            return card.value;
        }
    }


    return (
        <div style={{
            marginBottom: '5px',
            border: '1px solid black',
            backgroundColor: 'whitesmoke',
            color: formatColor(card.suit)
        }}
        >
            <p>{formatDisplayName(card)} {getSuitIcon(card.suit)}</p>
        </div>
    )
}