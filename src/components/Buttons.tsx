interface Props {
    hasDealt: boolean;
    hasStayed: boolean;
    dealCards: any;
    hit: any;
    stay: any
}


export default function Buttons({ hasDealt, hasStayed, dealCards, hit, stay }: Props) {

    const showDeal = !hasDealt;
    const showHit = hasDealt && !hasStayed;
    const showStay = hasDealt && !hasStayed;

    return (
        <div className="row mb-2 mt-1">
            <div className="col">
                {showDeal ?
                    <button className={btnStyle} onClick={dealCards}>Deal</button>
                    :
                    <EmptyButton />
                }
            </div>
            <div className="col">
                {showHit ?
                    <button className={btnStyle} onClick={() => hit()}>Hit</button>
                    :
                    <EmptyButton />
                }
            </div>
            <div className="col">
                {showStay ?
                    <button className={btnStyle} onClick={() => stay()}>stay</button>
                    :
                    <EmptyButton />
                }
            </div>
        </div>
    )
}


const btnStyle = "btn btn-secondary"

const EmptyButton = () => (
    <button className={btnStyle}></button>
)