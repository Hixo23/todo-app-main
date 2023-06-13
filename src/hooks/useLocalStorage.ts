import { useEffect, useState } from "react"

export const useLocalStorage = (storageKey: string, fallbackState: any) => {
    const [value, setValue] = useState(() => {
        let currentValue;

        try {
            currentValue = JSON.parse(
                localStorage.getItem(storageKey) || String(fallbackState)
            )
        } catch(e) {
            currentValue = fallbackState
        }
        return currentValue
    })

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(value))
    }, [value, storageKey])

    return [value, setValue]
};