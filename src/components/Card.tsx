import React from 'react'
import { SuitEnum } from '../util/enums';


interface Props {
    value: string;
    suit: SuitEnum;
}

export default function Card({ value, suit }: Props) {
    return (
        <div style={{ backgroundColor: 'grey', color: 'red', border: '1px solid black', padding: '10px' }}>
            <p>Value: {value}</p>
            <br />
            <p>Suit: {suit}</p>
        </div>
    )
}