import { IFullCard } from '../data/cardOptions'
import Card from './Card'

interface Props {
    cards: IFullCard[]
}

export default function Cards({ cards }: Props) {
    return (
        <div>
            {cards.map(card => (
                <Card card={card} />
            ))}
        </div>
    )
}