import { useState, useEffect } from "react";

const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState<string>(value);

  useEffect(() => {
    const handle = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(handle);
  }, [value, delay]);
  return debounceValue;
};

export default useDebounce;
