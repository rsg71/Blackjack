import React from 'react'

interface Props {
    children: any
}

export default function Row({ children }: Props) {
    return (
        <div className="row">
            {children}
        </div>
    )
}