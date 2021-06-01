const enhanceWithCoordControls = (draw, layout) => {
  const coordinates = [];

  const show = () => {
    layout.forEach((hex) => {
      coordinates.push(drawCoordinates(draw, hex));
    });

    return coordinates;
  };

  const hide = () => {
    coordinates.forEach((coord) => coord.remove());

    return coordinates;
  };

  const toggle = (doShow) => {
    return doShow ? show() : hide();
  };

  const drawCoordinates = (draw, hex) => {
    const point = hex.toPoint();
    const height = hex.height(); // note: same for all hex
    const center = hex.center(); // note: same for all hex
    const token = hex?.token?.toLowerCase();
    const standee = hex?.standee?.toLowerCase();
    const occupiedTile = token || standee;
    const classes = ["coordinate"];

    if (occupiedTile) {
      classes.push("occupied");
    }

    return draw
      .text(hex.toString())
      .dmove(point.x + center.x, point.y + height / 2)
      .attr({
        stroke: "none",
        fill: "rgba(0, 0, 0, 0.5)",
        "font-size": "10px",
      })
      .addClass(classes.join(" "));
  };

  layout.showCoordinates = show;
  layout.hideCoordinates = hide;
  layout.toggleCoordinates = toggle;

  return [show, hide];
};

export default enhanceWithCoordControls;
