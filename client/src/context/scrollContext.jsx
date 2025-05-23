import { createContext, use, useMemo, useRef, useState } from "react";

const ScrollContext = createContext(null);

export const ScrollContextProvider = ({ children }) => {
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  const value = useMemo(
    () => ({ containerRef, scrollRef, shouldAutoScroll, setShouldAutoScroll }),
    [shouldAutoScroll, setShouldAutoScroll]
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
};

export const useScroll = () => use(ScrollContext);
