import { colors, gameColors } from "./theme";

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
    group.add(drawLineHexCenterPoints(draw, startHex, endHex, isFocusPath));

    startHex = endHex;
    endHex = hexesClone.pop();
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

const drawLineHexCenterPoints = (draw, hex1, hex2, isFocusPath) => {
  const hexCenter = hex1.center();
  const hex1Point = hex1.toPoint();
  const hex2Point = hex2.toPoint();

  const x1 = hexCenter.x + hex1Point.x;
  const y1 = hexCenter.y + hex1Point.y;
  const x2 = hexCenter.x + hex2Point.x;
  const y2 = hexCenter.y + hex2Point.y;

  const line = draw.line(x1, y1, x2, y2).attr({
    "stroke-width": isFocusPath ? 4 : 2,
    stroke: isFocusPath ? colors.Persimmon : colors["Selective Yellow"],
  });

  return line;
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
    .add(drawToken(draw, hex, hexPoint, hexHeight, hexCenter));
};

const drawTile = (draw, hex, point, corners, onPublishHexDetails) => {
  const terrain = hex?.terrain?.toLowerCase();
  const tileClassNames = ["tile", terrain].join(" ");

  const attr = {
    fill: "#ffffff",
    "stroke-linejoin": " round",
    "stroke-linecap": " round",
    "stroke-width": " 2",
    stroke: "#000000",
  };

  switch (terrain) {
    case "wall":
      attr.fill = "#929292";
      break;
    case "obstacle":
      attr.fill = gameColors.obstacle;
      break;
    case "hazard":
      attr.fill = gameColors.hazard;
      break;
    case "difficult":
      attr.fill = gameColors.difficult;
      break;
    case "door":
      attr.fill = gameColors.door;
      break;
    case "corridor":
      attr.fill = gameColors.corridor;
      break;
  }

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
    .attr(attr)
    .addClass(tileClassNames);

  let isStrobing = false;
  hex.strobeEnd = () => {
    polygon.attr({ fill: attr.fill });
    isStrobing = false;
  };
  hex.strobe = () => {
    isStrobing = true;
    let s2;

    const radial = draw.gradient("radial", function (add) {
      s2 = add.stop(0.3, "#f03");
      add.stop(1, "#fff");
    });

    const doStrobe = () => {
      s2.animate(750, 0, "now")
        .ease("<")
        .update({ color: "#fff" })
        .after(() => {
          s2.update({ color: "#f03" });
          if (isStrobing) {
            doStrobe();
          }
        });
      polygon.fill(radial);
    };
    doStrobe();
  };

  hex.highlight = () => {
    polygon.attr({ fill: "#ffc" });
  };
  hex.highlightOff = () => {
    polygon.attr({ fill: attr.fill });
  };

  return polygon;
};

const drawStandee = (draw, hex, point, height, center) => {
  const standee = hex?.standee?.toLowerCase();

  if (!standee) {
    return undefined;
  }

  const standeeAttr = {
    "stroke-linejoin": "round",
    "stroke-linecap": "round",
    "stroke-width": 2,
    stroke: "#000000",
  };
  switch (standee) {
    case "monster":
      standeeAttr.fill = gameColors.monster;
      standeeAttr.stroke = "#661c2c";
      break;
    case "summon":
    case "player":
      standeeAttr.fill = gameColors.brute;
      standeeAttr.stroke = "#312574";
      break;
  }

  const circleSize = height * 0.7;
  const text = hex?.label.toUpperCase();
  const [marker, label] = drawTileMarker(draw, point, circleSize, center, text);

  marker.attr(standeeAttr);
  label.attr({
    stroke: "none",
    fill: "white",
  });

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

  const tokenAttrs = {
    "stroke-linejoin": "round",
    "stroke-linecap": "round",
    "stroke-width": "2",
    stroke: "#000000",
    fill: "none",
  };
  switch (token) {
    case "notation":
      tokenAttrs.fill = "none";
      break;
    case "trap":
      tokenAttrs.fill = gameColors.trap;
      break;
  }

  const circleSize = height * 0.5;
  const text = hex?.label?.toUpperCase() || "T";
  const [marker, label] = drawTileMarker(draw, point, circleSize, center, text);

  marker.attr(tokenAttrs);

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
