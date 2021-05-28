import React from "react";

const ScenrioContext = React.createContext();

const ScenrioProvider = ({ children }) => {
  const [scenrio, setScenrio] = React.useState(null);
  let m1Hex = null;
  let m1Attack = { range: 1, targetCount: 1 }; // TODO: this might need to be passed in somehow
  let focus = null;
  let focusOptions = null;

  if (scenrio) {
    m1Hex = scenrio.getMonster("M1");
    focus = m1Hex.findFocus(m1Attack);
    focusOptions = m1Hex.findFocusOptions(m1Attack);
  }

  const provided = {
    scenrio,
    setScenrio,
    m1Hex,
    focus,
    focusOptions,
  };

  return (
    <ScenrioContext.Provider value={provided}>
      {children}
    </ScenrioContext.Provider>
  );
};

const useScenrio = () => {
  const context = React.useContext(ScenrioContext);
  if (context === undefined) {
    throw new Error("useScenrio must be used within a ScenrioProvider");
  }
  return context;
};

export { ScenrioProvider, useScenrio };
