// bookingContext.js

import { createContext, useContext, useState } from "react";
export const AppStateContext = createContext({});

export function AppProvider({ children }) {
  const [booking, setBooking] = useState([]);

  const contextValue = {
    booking,
    setBooking,
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppBooking() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppBooking must be used within the AppProvider");
  }
  return context;
}
