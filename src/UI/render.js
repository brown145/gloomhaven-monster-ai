// TODO: Refactor in to hexboard
// todo: refactor into distinct files?

export const renderLayout = (draw, layout, focusOptions, onMouseOver) => {
  const allPaths = [...focusOptions.allPaths].reverse();

  const hexGridGroup = draw.group().addClass("hexBoard-hexGrid-group");
  layout.forEach((hex) => hexGridGroup.add(renderHex(draw, hex, onMouseOver)));

  const pathsGroup = draw.group().addClass("hexBoard-paths-group");
  allPaths.forEach((path, index) => {
    pathsGroup.add(renderHexPath(draw, path, index === allPaths.length - 1));
  });

  const hexOverlayGroup = draw.group().addClass("hexBoard-hexOverlay-group");
  layout.forEach((hex) => hexOverlayGroup.add(renderHexContents(draw, hex)));
};

const renderHexPath = (draw, hexes, isFocusPath) => {
  const hexesClone = [...hexes].reverse();
  const group = draw.group();

  let startHex = hexesClone.pop();
  let endHex = hexesClone.pop();

  while (endHex) {
    group
      .add(drawLineHexCenterPoints(draw, startHex, endHex))
      .addClass("hexBoard-paths-path");

    startHex = endHex;
    endHex = hexesClone.pop();
  }

  if (isFocusPath) {
    group.addClass("focus-path");
  }

  // TODO: make function
  const hexCenter = startHex.center();
  const hex1Point = startHex.toPoint();
  group.add(
    draw
      .circle(3)
      .center(hexCenter.x + hex1Point.x, hexCenter.y + hex1Point.y)
      .addClass("hexBoard-paths-path-end")
  );

  return group;
};

const drawLineHexCenterPoints = (draw, hex1, hex2) => {
  const hexCenter = hex1.center();
  const hex1Point = hex1.toPoint();
  const hex2Point = hex2.toPoint();

  const x1 = hexCenter.x + hex1Point.x;
  const y1 = hexCenter.y + hex1Point.y;
  const x2 = hexCenter.x + hex2Point.x;
  const y2 = hexCenter.y + hex2Point.y;

  return draw.line(x1, y1, x2, y2);
};

const renderHex = (draw, hex, onPublishHexDetails) => {
  const id = hex.toString();
  const hexPoint = hex.toPoint();
  const hexCorners = hex.corners(); // note: same for all hex

  return draw
    .group()
    .add(drawTile(draw, hex, hexPoint, hexCorners, onPublishHexDetails))
    .data({ id });
};

const renderHexContents = (draw, hex) => {
  const hexPoint = hex.toPoint();
  const hexHeight = hex.height(); // note: same for all hex
  const hexCenter = hex.center(); // note: same for all hex

  return draw
    .group()
    .add(drawStandee(draw, hex, hexPoint, hexHeight, hexCenter))
    .add(drawToken(draw, hex, hexPoint, hexHeight, hexCenter))
    .add(drawCoordinates(draw, hex, hexPoint, hexHeight, hexCenter));
};

const drawTile = (draw, hex, point, corners, onPublishHexDetails) => {
  const terrain = hex?.terrain?.toLowerCase();
  const tileClassNames = ["tile", terrain].join(" ");

  const polygon = draw
    .polygon(
      corners.map(({ x, y }) => `${x + point.x},${y + point.y}`).join(",")
    )
    .on("mouseover", function () {
      onPublishHexDetails(hex);
    })
    .on("mousedown", function (e) {
      console.log("tile clicked", this.animate, e.target);
      this.animate(200, 10, "now").attr({ fill: "#f03" });
    })
    .addClass(tileClassNames);

  // function firstAnimation() {
  //   polygon.animate().move(point.x, point.y).after(secondAnimation);
  // }

  // function secondAnimation() {
  //   polygon
  //     .animate()
  //     .move(point.x + 10, point.y + 10)
  //     .after(firstAnimation);
  // }

  // hex.fooBar = function () {
  //   console.log("fooing the bar");

  //   firstAnimation();
  // };

  return polygon;
};

const drawStandee = (draw, hex, point, height, center) => {
  const standee = hex?.standee?.toLowerCase();
  let doAnimate = false;

  if (!standee) {
    return undefined;
  }

  const circleSize = height * 0.7;
  const text = hex?.label.toUpperCase();
  const [marker, label] = drawTileMarker(draw, point, circleSize, center, text);

  function firstAnimation() {
    marker
      .animate()
      .attr({ fill: "#ccc" })
      .after(() => {
        if (doAnimate) {
          secondAnimation();
        }
      });
  }

  function secondAnimation() {
    marker
      .animate()
      .attr({ fill: "#f03" })
      .after(() => {
        if (doAnimate) {
          firstAnimation();
        }
      });
  }

  hex.fooBar = function () {
    console.log("fooing the bar");

    doAnimate = true;
    firstAnimation();
  };

  hex.unFooBar = function () {
    console.log("stop the fooing");
    doAnimate = false;
    // marker.timeline().stop();
  };

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

  // todo
  // marker.on("mouseover", (event) => {
  //   console.log(event.target, marker);
  //   marker
  //     .animate(400, 1000, "now")
  //     .loop(10, 2, 20)
  //     .ease(">")
  //     .attr({ "fill-opacity": 0.5, "stroke-width": 10 });
  // });

  // todo
  // marker
  //   .animate(400, 1000, "now")
  //   .loop(10, 2, 20)
  //   .ease(">")
  //   .attr({ "fill-opacity": 0.5, "stroke-width": 10 });

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
