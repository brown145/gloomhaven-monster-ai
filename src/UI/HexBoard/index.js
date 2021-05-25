import React from "react";
import { SVG } from "@svgdotjs/svg.js";
import { renderLayout } from "../render";

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// DEV NOTE: no idea if this is going to cause this to re-render too much
const HexBoard = ({ layout, onHexDetail }) => {
  const SVGref = React.createRef();

  const handleMouseOver = (hexInfo) => {
    onHexDetail(hexInfo);
  };

  React.useEffect(() => {
    console.debug("initializaing the SVG");
    removeAllChildNodes(SVGref.current);
    const svg = SVG().addTo(SVGref.current).size("100%", "100%");
    renderLayout(svg, layout, handleMouseOver);
  }, [layout]);

  console.debug("rendering the SVG container");
  return <div ref={SVGref} className="hexBoard"></div>;
};

export default HexBoard;
