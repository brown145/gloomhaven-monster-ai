export const renderLayout = (draw, layout, onMouseOver) => {
  layout.forEach((hex) => renderHex(draw, hex, onMouseOver));
};

const renderHex = (draw, hex, onPublishHexDetails) => {
  const id = hex.toString();
  const hexPoint = hex.toPoint();
  const hexCorners = hex.corners(); // note: same for all hex
  const hexHeight = hex.height(); // note: same for all hex
  const hexCenter = hex.center(); // note: same for all hex

  return draw
    .group()
    .add(drawTile(draw, hex, hexPoint, hexCorners, onPublishHexDetails))
    .add(drawStandee(draw, hex, hexPoint, hexHeight, hexCenter))
    .add(drawToken(draw, hex, hexPoint, hexHeight, hexCenter))
    .add(drawCoordinates(draw, hex, hexPoint, hexHeight, hexCenter))
    .data({ id });
};

const drawTile = (draw, hex, point, corners, onPublishHexDetails) => {
  const terrain = hex?.terrain?.toLowerCase();
  const tileClassNames = ["tile", terrain].join(" ");

  return draw
    .polygon(
      corners.map(({ x, y }) => `${x + point.x},${y + point.y}`).join(",")
    )
    .on("mouseover", () => onPublishHexDetails(hex))
    .addClass(tileClassNames);
};

const drawStandee = (draw, hex, point, height, center) => {
  const standee = hex?.standee?.toLowerCase();

  if (!standee) {
    return undefined;
  }

  const circleSize = height * 0.7;
  const text = hex?.label.toUpperCase();
  const [marker, label] = drawTileMarker(draw, point, circleSize, center, text);
  return draw
    .group()
    .add(marker.addClass(["standee", standee].join(" ")))
    .add(label.addClass("standee-label"));
};

const drawToken = (draw, hex, point, height, center) => {
  const token = hex?.token?.toLowerCase();

  if (!token) {
    return undefined;
  }

  const circleSize = height * 0.5;
  const text = hex?.label?.toUpperCase() || "T";
  const [marker, label] = drawTileMarker(draw, point, circleSize, center, text);

  return draw
    .group()
    .add(marker.addClass(["token", token].join(" ")))
    .add(label.addClass("token-label"));
};

const drawTileMarker = (draw, point, height, center, text) => {
  const centerPoint = {
    x: point.x + center.x,
    y: point.y + center.y,
  };

  const marker = draw.circle(height).center(centerPoint.x, centerPoint.y);

  const label = draw.text(text).center(centerPoint.x, centerPoint.y);

  return [marker, label];
};

const drawCoordinates = (draw, hex, point, height, center) => {
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
    .addClass(classes.join(" "));
};
