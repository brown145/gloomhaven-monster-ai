import Link from "@material-ui/core/Link";
import React from "react";

const StandeeLink = ({ hex }) => {
  return (
    <Link color="primary" underline="always">
      {hex.label}
    </Link>
  );
};

export default StandeeLink;
