import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import React from "react";
import StandeeToLink from "./util/StandeeToLink";
import Typography from "@material-ui/core/Typography";
import { useScenrio } from "ui/contexts/ScenrioContext";

const Review = () => {
  const { m1Hex } = useScenrio();

  return (
    <>
      <Typography>
        Review the scenrio and determine what monster{" "}
        {<StandeeToLink standee={m1Hex} />} should do on its turn;
      </Typography>
      <Box pt={3}>
        <Divider />
      </Box>
    </>
  );
};

export default Review;
