import { IFullCard } from '../data/cardOptions';
import { formatColor, formatDisplayName, getSuitIcon } from '../util/cards';


interface Props {
    card: IFullCard
}

export default function Card({ card }: Props) {

    if (!card) {
        return <div></div>
    }

    const suitIcon = getSuitIcon(card.suit) || "";
    const displayName = formatDisplayName(card);

    return (
        <div style={{
            marginBottom: '5px',
            border: '1px solid black',
            backgroundColor: 'whitesmoke',
            color: formatColor(card.suit)
        }}
        >
            <p>{displayName} {suitIcon}</p>
        </div>
    )
}