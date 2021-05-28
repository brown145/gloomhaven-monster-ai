import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import useLocalStorage from "ui/util/useLocalStorage";

const useStyles = makeStyles({
  root: {
    maxWidth: 1200,
  },
});

const Explainer = () => {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useLocalStorage("app-explainer", true);

  const handleSetIsVisible = (e) => setIsVisible(false);

  if (!isVisible) {
    return null;
  }

  return (
    <Paper elevation={1} square className={classes.root}>
      <Box display="flex" justifyContent="space-between" p={3}>
        <Box>
          <Typography variant="h5" component="h2">
            What is this?
          </Typography>
          <Typography variant="body2" component="p">
            todo: its a work in progress. most likely I forgot that this
            explainer text exsits because I have dismissed it and it hasnt shown
            back up during development. That said, this thing might be useable.
            Try it out.
          </Typography>
          <Typography variant="body2" component="p">
            Gloomy monsters are monsters that behave like ... like they are
            described in the gloomhaven instructions?
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<CloseIcon />}
            onClick={handleSetIsVisible}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Explainer;
