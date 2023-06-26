import { useEffect, useState, Dispatch, SetStateAction } from "react"

type SetValue<T> = Dispatch<SetStateAction<T>>

export function useLocalStorage<T>(storageKey: string, fallbackState: string | number | boolean | [] | object): [T, SetValue<T>]  {
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
}