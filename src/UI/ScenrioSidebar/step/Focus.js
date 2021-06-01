import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import HexLink from "../HexLink";
import Link from "@material-ui/core/Link";
import React from "react";
import StandeeToLink from "./util/StandeeToLink";
import Switch from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useScenrio } from "ui/contexts/ScenrioContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .withTooltip": {
      borderBottom: "2px dotted",
    },
  },
  arrow: {
    position: "relative",
    bottom: 3,
  },
}));

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

const Focus = () => {
  const classes = useStyles();
  const { m1Hex, focus, focusOptions } = useScenrio();

  if (!m1Hex || !focus || !focusOptions) {
    return <div>unable to render</div>;
  }

  return (
    <Box className={classes.root}>
      <Typography>
        <StandeeToLink standee={m1Hex} />
        <> has </>
        <Tooltip
          arrow
          title={focusOptions.rankedTargets
            .map((target) => target.label)
            .join(" -> ")}
          placement="bottom"
        >
          <Link className="withTooltip">
            {focusOptions.rankedTargets.length}
          </Link>
        </Tooltip>{" "}
        possible targets, but the primary focus is{" "}
        {<StandeeToLink standee={focus} />}.
      </Typography>
      <Box pt={3} pb={3}>
        <Divider />
      </Box>
      <Typography>
        <>Of </>
        <Tooltip
          arrow
          title={focusOptions.allPaths.map((path, i) => (
            <div key={i}>{path.map((hex) => hex.toString()).join(" -> ")}</div>
          ))}
          placement="bottom"
        >
          <Link className="withTooltip">{focusOptions.allPaths.length}</Link>
        </Tooltip>
        <> considered paths, the chosen focus path is </>
        {jsxJoin(
          focusOptions.allPaths[0].map((hex) => <HexLink hex={hex} />),
          <span className={classes.arrow}> &rarr; </span>
        )}
        .
      </Typography>
      <Box pt={1}>
        <FormControlLabel control={<Switch />} label="Show Alternate Paths" />
      </Box>
      <Box pt={3}>
        <Divider />
      </Box>
    </Box>
  );
};

export default Focus;
