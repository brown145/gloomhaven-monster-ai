import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& svg": {
      position: "relative",
      bottom: "-5px",
    },
    "& polygon": {
      fill: "whitesmoke",
      stroke: "black",
      strokeWidth: "5px",
    },
    "& .coordsInside": {
      "& text": {
        fontSize: "55px",
        textAnchor: "middle",
      },
      "& .coords.outside": {
        display: "none",
      },
    },
    "& .coordsOutside": {
      "& .coords.inside": {
        display: "none",
      },
    },
  },
}));

const HexLink = ({ hex }) => {
  const classes = useStyles();
  const coordsInside = hex.toString().length <= 3;
  const containerClass = coordsInside ? "coordsInside" : "coordsOutside";

  const handleMouseOver = () => {
    hex?.highlight();
  };

  const handleMouseOut = () => {
    hex?.highlightOff();
  };

  return (
    <span
      className={classes.root}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <span className={containerClass}>
        <SvgIcon viewBox="0 0 100 100">
          <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" />
          <text className={["coords", "inside"].join(" ")} x="50" y="70">
            {hex.toString()}
          </text>
        </SvgIcon>
        <span className={["coords", "outside"].join(" ")}>
          {` [${hex.toString()}]`}
        </span>
      </span>
    </span>
  );
};

export default HexLink;
