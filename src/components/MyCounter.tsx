import { useEffect, useState } from "react"
import { getRandomFruit } from "../util/Blackjack";

const MyCounter = () => {
    const [timer, setTimer] = useState(10)

    const [shouldTimerStart, setShouldTimerStart] = useState(false);

    const [cards, setCards] = useState<string[]>([]);

    const handleAdd = (card: string) => {
        const copy = [...cards];
        copy.push(card);
        setCards(copy);
    }

    const decrementTimer = () => {
        setTimer((oldTimer) => oldTimer - 1);

        // and add a card
        let newCard = getRandomFruit();
        console.log('adding : ', newCard);
        handleAdd(newCard);
    }

    useEffect(() => {
        if (timer <= 0) {
            return
        }

        if (shouldTimerStart) {

            const timeoutFunction = setInterval(decrementTimer, 1000)
            return () => clearInterval(timeoutFunction);
        }

    }, [timer, shouldTimerStart])

    return (
        <div>
            <div className={timer > 0 ? "alert alert-warning" : "alert alert-success"}
            >
                This message will turn green in {timer} seconds
            </div>
            <button onClick={() => setShouldTimerStart(true)}>start timer</button>
            <pre>shouldTimerStart?: {shouldTimerStart.toString()}</pre>

            <div className="mt-3 ms-2">
                {cards.map(card => <p className="border border-success">{card}</p>)}
            </div>
        </div>
    )
}

export default MyCounter;