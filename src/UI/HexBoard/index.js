import React from "react";
import { SVG } from "@svgdotjs/svg.js";
import enhanceWithCoordControls from "./enhanceWithCoordControls";
import { renderLayout } from "../render";
import { useScenrio } from "ui/contexts/ScenrioContext";
import { useUserSettings } from "ui/contexts/UserSettingsContext";

// TODO: make util
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// DEV NOTE: no idea if this is going to cause this to re-render too much
const HexBoard = ({ onHexDetail }) => {
  const { scenrio, focusOptions } = useScenrio();
  const { isVisibleCoords } = useUserSettings();
  const SVGref = React.createRef();

  const handleMouseOver = (hexInfo) => {
    onHexDetail(hexInfo);
  };

  // TODO: meed a return?
  React.useEffect(() => {
    if (scenrio) {
      console.debug("initializaing the SVG");
      removeAllChildNodes(SVGref.current);
      const svg = SVG().addTo(SVGref.current).size("100%", "100%");
      renderLayout(svg, scenrio, focusOptions, handleMouseOver);
      enhanceWithCoordControls(svg, scenrio);
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
