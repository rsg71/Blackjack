import { IFullCard } from '../data/cardOptions';
import { formatColor, formatDisplayName, getSuitIcon } from '../util/cards';


interface Props {
    card: IFullCard;
    showBack?: boolean;
}

export default function Card({ card, showBack = false }: Props) {

    if (!card) {
        return <div></div>
    }

    const suitIcon = getSuitIcon(card.suit) || "";
    const displayName = formatDisplayName(card);

    const regularStyle = {
        marginBottom: '5px',
        border: '1px solid black',
        backgroundColor: 'whitesmoke',
        color: formatColor(card.suit)
    }

    const gradient = 'repeating-linear-gradient(54deg, rgb(255 255 255), rgb(255 0 0) 10px, rgb(255 0 0) 10px, rgb(255 172 172) 20px)';

    const backOfCardStyle = {
        marginBottom: '5px',
        border: '1px solid black',
        background: gradient
    }


    return (
        <div style={showBack ? backOfCardStyle : regularStyle}
        >
            <p style={showBack ? { visibility: "hidden" } : { visibility: "visible" }}>
                {displayName} {suitIcon}
            </p>
        </div>
    )
}