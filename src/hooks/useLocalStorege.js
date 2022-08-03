import { useState,useEffect } from "react";

export function useLocalStorage(key, initialValue) {
        const [value, setValue] = useState(() => {
          const jsonValue = localStorage.getItem(key)
          if (jsonValue != null || jsonValue != undefined) return JSON.parse(jsonValue)
          return initialValue
        })
      
        useEffect(() => {
            localStorage.setItem(key, JSON.stringify(value))
        }, [key, value])
      
        return [value, setValue]
}