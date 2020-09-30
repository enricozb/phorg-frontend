import { useEffect, useState } from "react";
const Mousetrap = require("mousetrap");

export const useMousetrap = () => {
  const [mousetrap, setMousetrap] = useState(new Mousetrap());
  const [keybindings, setKeybindings] = useState([] as string[]);

  const bindKeys = (keyMap: Record<string, () => void>) => {
    for (const [keys, func] of Object.entries(keyMap)) {
      mousetrap.bind(keys, func);
    }
    setKeybindings(Object.keys(keyMap));
  };

  const unbindKeys = () => {
    keybindings.forEach((keys) => mousetrap.unbind(keys));
  };

  return {bindKeys, unbindKeys};
};
