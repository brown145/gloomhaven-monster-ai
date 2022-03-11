import BGGScenrios from "scenrios/bgg/";
import Box from "@material-ui/core/Box";
import Controls from "ui/Controls/";
import ExampleScenrios from "scenrios/rulebook/";
import Explainer from "ui/Explainer";
import Heading from "ui/Heading";
import HexBoard from "ui/HexBoard/";
import HexDetails from "ui/HexDetails";
import React from "react";
import ScenrioSidebar from "ui/ScenrioSidebar/";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useScenrio } from "ui/contexts/ScenrioContext";
import { useUserSettings } from "ui/contexts/UserSettingsContext";

const useStyles = makeStyles((theme) => ({
  root: {},
  appScenrioSidebar: {
    maxWidth: 400,
  },
  main: {
    maxWidth: 800,
  },
}));

const allLayouts = [...ExampleScenrios, ...BGGScenrios];

const App = () => {
  const classes = useStyles();
  const { scenrioIndex } = useUserSettings();
  const { setScenrio } = useScenrio();
  const [hexInfo, setHexInfo] = React.useState(null);

  React.useEffect(() => {
    const scenrio = allLayouts[scenrioIndex];
    console.log(allLayouts);
    setScenrio(scenrio);
  }, [scenrioIndex]);

  return (
    <Box
      id="app"
      className={classes.root}
      display="flex"
      flexDirection="column"
    >
      <Heading />
      <Box display="flex" justifyContent="center">
        <Explainer />
      </Box>
      <Box display="flex" flexDirection="column" flexGrow={1}>
        <Box
          display="flex"
          flexDirection="row"
          flexGrow={1}
          justifyContent="center"
        >
          <Box
            display="flex"
            flexDirection="column"
            flexGrow={1}
            className={classes.main}
          >
            <Box p={1}>
              <Controls layouts={allLayouts} />
            </Box>
            <Box flexGrow={1} p={2} display="flex" justifyContent="center">
              <HexBoard onHexDetail={setHexInfo} />
            </Box>
            <Box pl={1}>
              <HexDetails details={hexInfo} />
            </Box>
          </Box>
          <Box className={classes.appScenrioSidebar} p={1}>
            <ScenrioSidebar />
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
