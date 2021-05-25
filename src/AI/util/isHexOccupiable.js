import { TILE_OVERLAY_TYPES } from "../../types";

const isHexOccupiable = ({ terrain }) => {
  // DEV NOTE: flying monsters can end turn on obstacles?
  return ![TILE_OVERLAY_TYPES.Wall, TILE_OVERLAY_TYPES.Obstacle].includes(
    terrain
  );
};

export default isHexOccupiable;
