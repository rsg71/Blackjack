import { useCallback, useEffect, useState } from "react"

const Counter = () => {

    const [timer, setTimer] = useState(10)

    const decrementTimer = useCallback(() => {
        setTimer((oldTimer) => oldTimer - 1)
    }, [])

    useEffect(() => {
        if (timer <= 0) {
            return
        }
        
        const timeoutFunction = setInterval(decrementTimer, 1000)
        return () => clearInterval(timeoutFunction);

    }, [decrementTimer, timer])


    return (
        <div>
            <div className={timer > 0 ? "bg-warning" : "bg-success"}>
                This message will turn green in {timer} seconds
            </div>
        </div>
    )
}

export default Counter;