import { IFullCard } from '../data/cardOptions'
import Card from './Card'

interface Props {
    cards: IFullCard[];
}

export default function Cards({ cards }: Props) {
    return (
        <div>
            {cards.map(card => (
                <div className="col">
                    <Card card={card} />
                </div>
            ))}
        </div>
    )
}