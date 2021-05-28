import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  titleBox: {
    maxWidth: 1200,
  },
  title: {
    flexGrow: 1,
    fontFamily: ["VT323", "monospace"],
    fontSize: "2em",
    color: theme.palette.custom["Selective Yellow"],
  },
}));

const Heading = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" justifyContent="center" flexGrow={1}>
            <Box flexGrow={1} className={classes.titleBox}>
              <Typography variant="h6" className={classes.title}>
                Gloomy Monster AI
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Heading;
