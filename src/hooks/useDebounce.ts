import { useState, useEffect } from "react";

function useDebounce(value: any, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(handle);
  }, [value, delay]);
  return debounceValue;
}

export default useDebounce;
