import getStroke from "perfect-freehand";
import {
  mouseTypes,
  toolActionType,
  toolTypes,
} from "../../constants/constants";

import {
  createRoughElement,
  getSvgPathFromStroke,
  isPointNearElement,
} from "../../utils/elements";

/**
 * Reducer function to manage the state of the drawing board.
 * Handles various actions such as changing tools, drawing, and erasing.
 *
 * @param {Object} state - The current state of the board.
 * @param {Object} action - The action to be handled by the reducer.
 * @returns {Object} The new state after applying the action.
 */
export const boardReducer = (state, action) => {
  //*state and action of reducer

  switch (action.type) {
    // Handles the change of the selected tool in the toolbar
    case mouseTypes.CHANGE_TOOL: {
      return {
        ...state, // spread operator = merges previous state
        selectedToolbarItem: action.payload, // Updates the selected tool
      };
    }

    // Handles the initial mouse down event, creating a new drawing element
    case mouseTypes.DRAW_DOWN: {
      const { clientX, clientY, strokeColor, fillColor, size } = action.payload;
      const newItem = createRoughElement(
        state.elements.length - 1,
        clientX,
        clientY,
        clientX,
        clientY,
        { toolType: state.selectedToolbarItem, strokeColor, fillColor, size }
      );

      return {
        ...state,
        elements: [...state.elements, newItem], // Adds the new element to the list of elements
        toolActionType: toolActionType.DRAWING, // Sets the current action type to drawing
      };
    }

    // Handles the mouse move event, updating the position of the current drawing element
    case mouseTypes.DRAW_MOVE: {
      const { clientX, clientY, strokeColor, fillColor, size } = action.payload;

      const currentIndex = state.elements.length - 1;

      if (currentIndex >= 0) {
        const existingElements = [...state.elements];
        const currentElement = { ...existingElements[currentIndex] }; // Creates a copy of the current element

        // Handles drawing for different tool types
        switch (currentElement.toolType) {
          // For the brush tool, points are added to create a path
          case toolTypes.BRUSH: {
            const points = { x: clientX, y: clientY };
            currentElement.points = [...currentElement.points, points]; // Adds the new point to the existing points
            const strokes = getStroke(currentElement.points); // Generates the stroke path from the points
            const path = getSvgPathFromStroke(strokes);
            currentElement.path = new Path2D(path); // Converts the stroke path to a Path2D object
            existingElements[currentIndex] = currentElement; // Updates the current element with the new path
            return { ...state, elements: existingElements };
          }

          // For line, arrow, circle, and rectangle tools, the element is redrawn with updated coordinates
          case toolTypes.LINE:
          case toolTypes.ARROW:
          case toolTypes.CIRCLE:
          case toolTypes.RECTANGLE: {
            const newElement = createRoughElement(
              currentIndex,
              currentElement.x1,
              currentElement.y1,
              clientX,
              clientY,
              {
                toolType: state.selectedToolbarItem,
                strokeColor,
                fillColor,
                size,
              }
            );
            existingElements[currentIndex] = newElement; // Updates the current element with the new coordinates
            return {
              ...state,
              elements: existingElements,
            };
          }

          default:
            break;
        }
      }
      return state; // Returns the current state if no changes are made
    }

    // Handles changing the current tool action type (e.g., drawing, typing, etc.)
    case mouseTypes.CHANGE_TOOL_ACTION_TYPE: {
      return {
        ...state,
        toolActionType: action.payload, // Updates the tool action type
      };
    }

    // Handles erasing elements by filtering out elements near the eraser's location
    case mouseTypes.ERASING: {
      const { clientX, clientY } = action.payload;
      const copiedElements = [...state.elements];
      const filteredElements = copiedElements.filter((elements) => {
        return !isPointNearElement(elements, {
          pointX: clientX,
          pointY: clientY,
        });
      });
      return { ...state, elements: filteredElements }; // Updates the elements array after erasing
    }

    // Returns the current state if the action type doesn't match any case
    default:
      return state;
  }
};

/**
 * Initial state for the board reducer, defining the default tool,
 * empty elements array, and no current action.
 */
export const initialReducerState = {
  selectedToolbarItem: toolTypes.LINE, // Default tool is the line tool
  elements: [], // Initial empty array for drawing elements
  toolActionType: toolActionType.NONE, // No current action by default
};
