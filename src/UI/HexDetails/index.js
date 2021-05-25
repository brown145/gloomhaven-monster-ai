import Box from "@material-ui/core/Box";
import React from "react";
import Typography from "@material-ui/core/Typography";

const HexDetails = ({ details }) => {
  if (!details) {
    return null;
  }

  return (
    <Box display="flex" justifyContent="flex-end" pr={0.5}>
      <Typography variant="caption" display="block" gutterBottom>
        {JSON.stringify(details)}
      </Typography>
    </Box>
  );
};

export default HexDetails;
