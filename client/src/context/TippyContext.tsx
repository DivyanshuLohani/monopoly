import React, { createContext, useContext, useMemo } from "react";
import Tippy, { useSingleton } from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css"; // Import the animation CSS

interface TippyContextProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  singletonTarget: any;
}

const TippyContext = createContext<TippyContextProps | undefined>(undefined);

// TippyProvider component that will wrap your application
export const TippyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [source, target] = useSingleton(); // Creating a Tippy singleton instance

  // Memoizing the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ singletonTarget: target }), [target]);

  return (
    <TippyContext.Provider value={contextValue}>
      {/* This singleton Tippy component initializes the singleton context */}
      <Tippy
        singleton={source}
        moveTransition="transform 0.2s ease-out"
        animation="shift-away"
        trigger="click"
        interactive
        arrow
        delay={[200, 0]}
      />
      {children}
    </TippyContext.Provider>
  );
};

// Custom hook to consume the Tippy context
// eslint-disable-next-line react-refresh/only-export-components
export const useTippy = (): TippyContextProps => {
  const context = useContext(TippyContext);
  if (!context) {
    throw new Error("useTippy must be used within a TippyProvider");
  }
  return context;
};
