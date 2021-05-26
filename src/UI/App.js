import BGGScenrios from "scenrios/bgg/";
import Box from "@material-ui/core/Box";
import Controls from "ui/Controls/";
import ExampleScenrios from "scenrios/rulebook/";
import HexBoard from "ui/HexBoard/";
import HexDetails from "ui/HexDetails";
import React from "react";
import Typography from "@material-ui/core/Typography";
import useLocalStorage from "ui/util/useLocalStorage";

const allLayouts = [...ExampleScenrios, ...BGGScenrios];

const App = () => {
  const [selectedLayoutIndex, setSelectedLayoutIndex] = useLocalStorage(
    "config-selectedLayoutIndex",
    0
  );
  const [showCoordinates, setShowCoordiates] = useLocalStorage(
    "config-showCoords",
    true
  );
  const [hexInfo, setHexInfo] = React.useState(null);

  const selectedLayout = allLayouts[selectedLayoutIndex];
  const M1Hex = selectedLayout.getMonster("M1");
  const M1Attack = { range: 1, targetCount: 1 };
  const focus = M1Hex.findFocus(M1Attack);
  const focusOptions = M1Hex.findFocusOptions(M1Attack);

  console.log("focus", focus);
  console.log(`focusOptions ${focusOptions?.size}`, focusOptions);

  const hexBoardContainerClasses = showCoordinates
    ? "coords-shown"
    : "coords-hidden";

  const handleLayoutChange = (e) => {
    setSelectedLayoutIndex(e.target.value);
    setHexInfo(null);
  };

  const handleCoordiateVisibilityChange = (e) =>
    setShowCoordiates(e.target.checked);

  return (
    <Box id="app" display="flex" flexDirection="column">
      <Box id="app-bar" p={1}>
        Gloomy Monster AI Haven
      </Box>
      <Box id="app-main" display="flex" flexDirection="column" flexGrow={1}>
        <Box display="flex" flexDirection="row" flexGrow={1}>
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Box id="app-scenrio-controls" p={1}>
              <Controls
                layouts={allLayouts}
                selectedLayout={selectedLayoutIndex}
                showCoordinates={showCoordinates}
                onLayoutChange={handleLayoutChange}
                onCoordiateVisibilityChange={handleCoordiateVisibilityChange}
              />
            </Box>
            <Box
              id="app-scenrio-display"
              flexGrow={1}
              p={2}
              className={hexBoardContainerClasses}
            >
              <HexBoard layout={selectedLayout} onHexDetail={setHexInfo} />
            </Box>
            <Box id="app-scenrio-hexInfo" pl={1}>
              <HexDetails details={hexInfo} />
            </Box>
          </Box>
          <Box id="app-scenrio-sidebar" p={1}>
            <Typography variant="body1">Scenrio Sidebar</Typography>
          </Box>
        </Box>
      </Box>
      <Box id="app-footer" p={1} pt={3} pb={3}>
        <Typography variant="body2">App Foot</Typography>
      </Box>
    </Box>
  );
};

export default App;
