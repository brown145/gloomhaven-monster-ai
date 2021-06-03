import React from "react";
import { SVG } from "@svgdotjs/svg.js";
import ScenrioRenderer from "./svgRenderers/ScenrioRenderer";
import removeAllChildNodes from "./svgRenderers/util/removeAllChildNotes.js";
import { useScenrio } from "ui/contexts/ScenrioContext";
import { useUserSettings } from "ui/contexts/UserSettingsContext";

// DEV NOTE: no idea if this is going to cause this to re-render too much
const HexBoard = ({ onHexDetail }) => {
  const { scenrio } = useScenrio();
  const { isVisibleCoords } = useUserSettings();
  const SVGref = React.createRef();

  const handleMouseOver = (hexInfo) => {
    // DEV NOTE: do i care that this sets App level state and causes entire app re-render; seems a lot tied to mouse over
    onHexDetail(hexInfo);
  };

  React.useEffect(() => {
    if (scenrio) {
      removeAllChildNodes(SVGref.current);
      const svg = SVG().addTo(SVGref.current).size("100%", "100%");
      const scenrioSVG = ScenrioRenderer(scenrio, svg);
      scenrioSVG.init();
      scenrioSVG.registerListener("tile-mouseover", handleMouseOver);
      scenrioSVG.registerListener("tile-mouseout", () => handleMouseOver());
    }
  }, [scenrio]);

  React.useEffect(() => {
    scenrio?.toggleCoordinates(isVisibleCoords);
  }, [scenrio, isVisibleCoords]);

  console.debug("rendering the SVG container");
  return (
    <div>
      <div ref={SVGref} className="hexBoard"></div>
    </div>
  );
};

export default HexBoard;
