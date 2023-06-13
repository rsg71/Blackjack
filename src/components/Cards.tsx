import React from 'react'
import Card from './Card'
import { ICard } from '../interfaces'

interface Props {
    cards: ICard[]
}

export default function Cards({ cards }: Props) {
    return (
        <div>
            {cards.map(card => (
                <Card value={card.value} suit={card.suit} />
            ))}
        </div>
    )
}