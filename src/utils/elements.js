import roughjs from "roughjs/bin/rough";
import { toolTypes } from "../constants/constants";
import { getArrowHeadsCoordinates, isPointCloseToLine } from "./math";
import { getStroke } from "perfect-freehand";

export const createRoughElement = (
  id,
  x1,
  y1,
  x2,
  y2,
  { toolType, strokeColor, fillColor, size }
) => {
  const generator = roughjs.generator();
  const newItem = {
    id, //Param : key (same)
    x1,
    y1,
    x2,
    y2,
    toolType,
  };
  let options = {
    seed: id + 1,
    fillStyle: "solid",
  };
  if (strokeColor) {
    options.stroke = strokeColor;
  }
  if (fillColor) {
    options.fill = fillColor;
  }
  if (size) {
    options.strokeWidth = size;
  }
  switch (toolType) {
    case toolTypes.LINE:
      newItem.roughEle = generator.line(x1, y1, x2, y2, options);
      return newItem;

    case toolTypes.RECTANGLE:
      newItem.roughEle = generator.rectangle(x1, y1, x2 - x1, y2 - y1, options); // x, y, width, height
      return newItem;

    case toolTypes.CIRCLE:
      const cx = (x1 + x2) / 2,
        cy = (y1 + y2) / 2,
        width = x2 - x1,
        height = y2 - y1;
      newItem.roughEle = generator.ellipse(cx, cy, width, height, options); // x, y, width, height
      // console.log(newItem);
      return newItem;

    case toolTypes.ARROW:
      const { x3, y3, x4, y4 } = getArrowHeadsCoordinates(x1, y1, x2, y2, 20);
      const coords = [
        [x1, y1],
        [x2, y2],
        [x3, y3],
        [x2, y2],
        [x4, y4],
      ];
      newItem.roughEle = generator.linearPath(coords, options);
      return newItem;

    case toolTypes.BRUSH:
      const points = [{ x: x1, y: y1 }];
      const strokes = getStroke(points);
      const path = getSvgPathFromStroke(strokes);
      const brushElement = {
        id,
        points,
        path: new Path2D(path),
        strokeColor,
        toolType,
      };
      return brushElement;

    default:
      throw new Error("Select a type");
  }
};

export const getSvgPathFromStroke = (stroke) => {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
};

export const isPointNearElement = (element, { pointX, pointY }) => {
  const { x1, y1, x2, y2, toolType } = element;
  const context = document.getElementById("canvas").getContext("2d"); // HTML selectors
  switch (toolType) {
    case toolTypes.LINE:
    case toolTypes.ARROW:
      return isPointCloseToLine(x1, y1, x2, y2, pointX, pointY);
    case toolTypes.RECTANGLE:
    case toolTypes.CIRCLE:
      return (
        isPointCloseToLine(x1, y1, x2, y1, pointX, pointY) ||
        isPointCloseToLine(x2, y1, x2, y2, pointX, pointY) ||
        isPointCloseToLine(x2, y2, x1, y2, pointX, pointY) ||
        isPointCloseToLine(x1, y2, x1, y1, pointX, pointY)
      );

    case toolTypes.BRUSH:
      return context.isPointInPath(element.path, pointX, pointY);
    default:
      throw new Error(`Type not recognized ${toolType}`);
  }
};
