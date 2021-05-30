import React from "react";

export const STEPS = [
  {
    id: "preview",
    name: "Review",
  },
  {
    id: "focus",
    name: "Monster Focus",
  },
  {
    id: "movement",
    name: "monster movement",
  },
  {
    id: "attack",
    name: "monster attack",
  },
];

const StepContext = React.createContext();

const StepProvider = ({ children }) => {
  const [stepIndex, setStepIndex] = React.useState(0);

  const step = STEPS[stepIndex] || null;

  const next = () => setStepIndex(stepIndex + 1);
  const back = () => setStepIndex(stepIndex - 1);
  const reset = () => setStepIndex(0);

  const provided = {
    step,
    stepIndex,
    next,
    back,
    reset,
  };

  return (
    <StepContext.Provider value={provided}>{children}</StepContext.Provider>
  );
};

const useStep = () => {
  const context = React.useContext(StepContext);
  if (context === undefined) {
    throw new Error("useStep must be used within a StepProvider");
  }
  return context;
};

export { StepProvider, useStep };
