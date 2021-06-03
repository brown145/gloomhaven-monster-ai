import AnimateSVG from "./AnimateSVG";
import CoordinateSVG from "./CoordinateSVG";
import OverlaySVG from "./OverlaySVG";
import PathSVG from "./PathSVG";
import StandeeSVG from "./StandeeSVG";
import TileSVG from "./TileSVG";
import hasOverlay from "./util/hasOverlay";
import hasStandee from "./util/hasStandee";

function ScenrioRenderer(scenrio, svg) {
  // use groups to create Layers; regardless of paint order
  const tileLayer = svg.group().addClass("tileS-layer");
  const tileSVG = TileSVG(tileLayer);
  const animateSVG = AnimateSVG(tileLayer);
  const coordinateSVG = CoordinateSVG(
    svg.group().addClass("coordinateS-layer")
  );
  const pathLayer = svg.group().addClass("paths-layer");
  const pathSVG = PathSVG(pathLayer);
  const overlaySVG = OverlaySVG(svg.group().addClass("overlayS-layer"));
  const standeeSVG = StandeeSVG(svg.group().addClass("standeeS-layer"));

  function renderTiles() {
    scenrio.forEach((hex) => {
      const tile = tileSVG.renderTile(hex);

      const strobeStart = animateSVG.attachStrobeAnimation(tile);
      let strobeStop = null;
      hex.strobe = (doAnimate) => {
        if (doAnimate) {
          strobeStop = strobeStart();
        } else {
          strobeStop?.();
        }
      };

      const highlightStart = animateSVG.attachHighlightAnimation(tile, hex);
      let highlightStop = null;
      hex.highlight = (doAnimate) => {
        if (doAnimate) {
          highlightStop = highlightStart();
        } else {
          highlightStop?.();
        }
      };
    });
  }

  function renderCoordinates() {
    const coordinates = [];

    function showCoordinates() {
      scenrio
        .filter((hex) => !hasStandee(hex))
        .filter((hex) => !hasOverlay(hex))
        .forEach((hex) => {
          coordinates.push(coordinateSVG.renderCoordinate(hex));
        });

      return coordinates;
    }

    function hideCoordinates() {
      coordinates.forEach((coord) => coord.remove());
      return coordinates;
    }

    scenrio.toggleCoordinates = (doShow) => {
      if (doShow) {
        showCoordinates();
      } else {
        hideCoordinates();
      }
    };
  }

  function renderStandees() {
    scenrio.filter(hasStandee).forEach((hex) => {
      standeeSVG.renderStandee(hex);
    });
  }

  function renderOverlays() {
    scenrio.filter(hasOverlay).forEach((hex) => {
      overlaySVG.renderOverlay(hex);
    });
  }

  const renderPaths = (paths = [], config) => {
    paths.forEach((hex) => {
      pathSVG.renderPath(hex, config);
    });
  };

  function removePaths() {
    pathLayer.clear();
  }

  function registerListener(on, func) {
    const onLayer = on.split("-")[0].toLowerCase();
    switch (onLayer) {
      case "tile":
        tileLayer.listeners = tileLayer.listeners || {};
        tileLayer.listeners[on] = func;
        break;
    }
  }

  function init() {
    renderTiles();
    renderCoordinates();
    renderStandees();
    renderOverlays();

    scenrio.showPaths = renderPaths;
    scenrio.hidePaths = removePaths;
  }

  return {
    init,
    registerListener,
    renderCoordinates,
    renderOverlays,
    renderPaths,
    renderStandees,
    renderTiles,
  };
}

export default ScenrioRenderer;
