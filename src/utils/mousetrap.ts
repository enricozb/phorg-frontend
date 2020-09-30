import { useState } from "react";

const Mousetrap = require("mousetrap");

export const useMousetrap = () => {
  const [mousetrap, ,] = useState(new Mousetrap());

  return (keyMap: Record<string, () => void>) => {
    for (const [keys, func] of Object.entries(keyMap)) {
      mousetrap.bind(keys, func);
    }

    return () => {
      Object.keys(keyMap).forEach((keys) => mousetrap.unbind(keys));
    };
  };
};
