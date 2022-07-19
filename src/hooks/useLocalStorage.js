import { useState, useEffect } from "react";


function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
      const stateValue = localStorage.getItem(key);
      return stateValue !== null
        ? JSON.parse(stateValue)
        : defaultValue;
    });


    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}


export default useLocalStorage;