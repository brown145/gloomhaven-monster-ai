import Link from "@material-ui/core/Link";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "pointer",
  },
}));

const StandeeLink = ({ hex }) => {
  const classes = useStyles();

  const handleMouseOver = () => {
    hex?.strobe(true);
  };

  const handleMouseOut = () => {
    hex?.strobe(false);
  };

  return (
    <Link
      className={classes.root}
      color="primary"
      underline="always"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {hex.label}
    </Link>
  );
};

export default StandeeLink;
