import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const storedvalue = localStorage.getItem(key)
    ? localStorage.getItem(key)
    : initialState;

  const [value, setValue] = useState(JSON.parse(storedvalue));

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
