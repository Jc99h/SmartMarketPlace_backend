import React, { useState } from "react";
export const Context = React.createContext({});


export default function ContextProvider({ children }) {
  let data = {
    sidebar: {
      page: "Home",
      collapsed: false,
    },
    register: {
      id: null,
      admin: false,
    },
    admin: null,
    name: null,
  };
  const [appState, setAppState] = useState(data);
  return (
    <Context.Provider value={{ appState, setAppState }}>
      {children}
    </Context.Provider>
  );
}