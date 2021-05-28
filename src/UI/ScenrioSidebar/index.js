import AIDetails from "./AIDetails";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import React from "react";
import StepRunner from "./StepRunner";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useScenrio } from "ui/contexts/ScenrioContext";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: "6px 16px",
  },
}));

const ScenrioSidebar = () => {
  const classes = useStyles();
  const { scenrio } = useScenrio();

  return (
    <Box className={classes.root}>
      <Box pb={1}>
        <Paper elevation={1} className={classes.paper}>
          <Typography variant="h4" component="h3" gutterBottom>
            {scenrio?.title || "untilted scenrio"}
          </Typography>
          <Typography>
            {scenrio?.description || "no description provided"}
          </Typography>
        </Paper>
      </Box>
      <Box pb={1}>
        <Paper elevation={1} className={classes.paper}>
          <StepRunner />
        </Paper>
      </Box>
      <Box pb={1}>
        <AIDetails />
      </Box>
    </Box>
  );
};

export default ScenrioSidebar;
