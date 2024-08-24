import React, { useRef, useLayoutEffect, useContext } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import toolboxContext from "../../store/toolbox-context";
import { toolTypes } from "../../constants/constants";

/**
 * The Board component renders a drawing canvas and handles the drawing logic.
 * It utilizes the boardContext and toolboxContext to manage and apply the 
 * current drawing tools and states.
 */
const Board = () => {
  const canvasRef = useRef(); // Reference to the canvas element

  // Extracting relevant states and actions from context
  const { onMouseMove, onMouseDown, onMouseUp, elements, selectedToolbarItem } = useContext(boardContext);
  const { toolboxState } = useContext(toolboxContext);

  // Retrieving the selected tool's properties
  const strokeColor = toolboxState[selectedToolbarItem].stroke;
  const fillColor = toolboxState[selectedToolbarItem].fill;
  const size = toolboxState[selectedToolbarItem].size;

  /**
   * useLayoutEffect is used to draw elements on the canvas whenever the elements array changes.
   * It handles the rendering of different shapes and paths based on the current elements.
   */
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.save(); // Save the current canvas state
    const roughCanvas = rough.canvas(canvas); // Initialize rough.js for drawing

    // Iterate over each element to render it on the canvas
    elements.forEach((element) => {
      switch (element.toolType) {
        case toolTypes.LINE:
        case toolTypes.RECTANGLE:
        case toolTypes.CIRCLE:
        case toolTypes.ARROW:
          roughCanvas.draw(element.roughEle); // Draw the element using rough.js
          break;

        case toolTypes.BRUSH:
          context.fillStyle = element.strokeColor;
          context.strokeWidth = element.size;
          context.fill(element.path); // Draw the freehand brush strokes
          context.restore();
          break;

        default:
          break;
      }
    });

    // Clean up function to clear the canvas on component unmount
    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]); // Re-run the effect whenever 'elements' changes

  /**
   * Handles the mouse down event to initiate drawing.
   * It passes the current tool properties to the onMouseDown handler.
   */
  const handleOnMouseDown = (event) => {
    onMouseDown(event, strokeColor, fillColor, size);
  };

  /**
   * Handles the mouse move event to update the drawing in progress.
   * It passes the current tool properties to the onMouseMove handler.
   */
  const handleOnMouseMove = (event) => {
    onMouseMove(event, strokeColor, fillColor, size);
  };

  // Render the canvas element and attach event handlers
  return (
    <canvas
      ref={canvasRef} // Attach the canvas ref
      height={window.innerHeight} // Set the canvas height to match the window
      width={window.innerWidth} // Set the canvas width to match the window
      id={"canvas"} // Set the canvas ID
      onMouseDown={handleOnMouseDown} // Attach the mouse down handler
      onMouseMove={handleOnMouseMove} // Attach the mouse move handler
      onMouseUp={onMouseUp} // Attach the mouse up handler
    />
  );
};

export default Board;
