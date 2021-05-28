import HexLink from "../../HexLink";
import React from "react";
import StandeeLink from "../../StandeeLink";

const StandeeToLink = ({ standee }) => {
  if (!standee) {
    return null;
  }
  return (
    <>
      <StandeeLink hex={standee} />
      <span> at </span>
      <HexLink hex={standee} />
    </>
  );
};

export default StandeeToLink;
