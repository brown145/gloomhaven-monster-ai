import React from "react";
import useLocalStorage from "ui/util/useLocalStorage";

const UserSettingsContext = React.createContext();

const UserSettingsProvider = ({ initValue = null, children }) => {
  const [isVisibleCoords, setIsVisibleCoords] = useLocalStorage(
    "config-showCoords",
    !!initValue?.isVisibleCoords
  );

  const [scenrioIndex, setScenrioIndex] = useLocalStorage(
    "config-scenrioIndex",
    initValue?.scenrioIndex || 0
  );

  const handleIsVisibileCoordsChange = (value) => setIsVisibleCoords(!!value);

  const handleSetScenrioIndex = (value) => setScenrioIndex(Number(value));

  const provided = {
    isVisibleCoords,
    setIsVisibleCoords: handleIsVisibileCoordsChange,
    scenrioIndex,
    setScenrioIndex: handleSetScenrioIndex,
  };

  return (
    <UserSettingsContext.Provider value={provided}>
      {children}
    </UserSettingsContext.Provider>
  );
};

const useUserSettings = () => {
  const context = React.useContext(UserSettingsContext);
  if (context === undefined) {
    throw new Error(
      "useUserSettings must be used within a UserSettingsProvider"
    );
  }
  return context;
};

export { UserSettingsProvider, useUserSettings };
