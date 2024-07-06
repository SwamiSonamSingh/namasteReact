import { useEffect, useState } from "react"

const CheckOnlineStatus = () => {
    const [status, setStatus] = useState(true)
    useEffect(() => {
        window.addEventListener('online', () => {
            setStatus(true)
        })
        window.addEventListener('offline', () => {
            setStatus(false)
        })
    })
    return status
}

export default CheckOnlineStatus