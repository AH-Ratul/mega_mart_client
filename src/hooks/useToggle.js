import { useState, useCallback } from "react";

const useToggle = (initialStates) => {
  const [states, setStates] = useState(initialStates);

  const toggle = useCallback((key) => {
    setStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  }, []);

  return [states, toggle];
};

export default useToggle;
