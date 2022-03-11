import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import HexLink from "../HexLink";
import React from "react";
import StandeeToLink from "./util/StandeeToLink";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useScenrio } from "ui/contexts/ScenrioContext";

const useStyles = makeStyles((theme) => ({
  arrow: {
    position: "relative",
    bottom: 3,
  },
}));

// TODO: util
const jsxJoin = (elements, joinWith) => {
  return elements.reduce(
    (acc, jsxEl) =>
      acc === null ? (
        jsxEl
      ) : (
        <>
          {acc}
          {joinWith}
          {jsxEl}
        </>
      ),
    null
  );
};

const Movement = () => {
  const { movement } = useScenrio();
  const classes = useStyles();

  React.useEffect(() => {
    console.log("the movement is", movement);
    return () => {
      // TODO
    };
  }, [movement]);

  return (
    <>
      <Typography>TODO</Typography>
      {jsxJoin(
        movement.bestPath.map((hex) => <HexLink hex={hex} />),
        <span className={classes.arrow}> &rarr; </span>
      )}
      {!movement.bestPath.length && <span>no viable movement pahts</span>}
      <Box pt={3}>
        <Divider />
      </Box>
    </>
  );
};

export default Movement;
