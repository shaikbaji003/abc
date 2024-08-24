import React, { useReducer } from "react";
import boardContext from "../board-context";
import { boardReducer, initialReducerState } from "../reducer/board-reducer";
import {
  mouseTypes,
  toolActionType,
  toolbarItems,
  toolTypes,
} from "../../constants/constants";

const BoardProvider = ({ children }) => {
  /**
   * Using the useReducer hook to manage complex state logic for the board.
   * This replaces the traditional useState and allows for structured handling
   * of different actions within the board's state.
   */
  const [boardState, dispatchBoardStateActions] = useReducer(
    boardReducer,
    initialReducerState
  );

  /**
   * Handles the selection of a toolbar item. When a user clicks on a tool,
   * this function updates the selected tool in the state.
   * 
   * @param {string} toolItem - The name of the tool selected by the user.
   */
  const handleOnClickToolbarItem = (toolItem) => {
    dispatchBoardStateActions({
      type: mouseTypes.CHANGE_TOOL,
      payload: toolItem,
    });
  };

  /**
   * Handles the mousedown event on the canvas. Depending on the selected tool,
   * it either starts drawing, begins erasing, or does nothing.
   * 
   * @param {object} event - The mousedown event from the canvas.
   * @param {string} strokeColor - The color for the stroke of the drawing.
   * @param {string} fillColor - The color to fill the shape.
   * @param {number} size - The size of the brush or tool.
   */
  const onMouseDown = (event, strokeColor, fillColor, size) => {
    const { clientX, clientY } = event;

    // Special handling if the eraser tool is selected
    if (boardState.selectedToolbarItem === toolTypes.ERASER) {
      dispatchBoardStateActions({
        type: mouseTypes.CHANGE_TOOL_ACTION_TYPE,
        payload: mouseTypes.ERASING,
      });
      return;
    }

    // Starts drawing with the selected tool
    dispatchBoardStateActions({
      type: mouseTypes.DRAW_DOWN,
      payload: { clientX, clientY, strokeColor, fillColor, size },
    });
  };

  /**
   * Handles the mousemove event on the canvas. This continues drawing or erasing
   * based on the toolActionType in the state.
   * 
   * @param {object} event - The mousemove event from the canvas.
   * @param {string} strokeColor - The color for the stroke of the drawing.
   * @param {string} fillColor - The color to fill the shape.
   * @param {number} size - The size of the brush or tool.
   */
  const onMouseMove = (event, strokeColor, fillColor, size) => {
    const { clientX, clientY } = event;

    if (boardState.toolActionType === toolActionType.DRAWING) {
      dispatchBoardStateActions({
        type: mouseTypes.DRAW_MOVE,
        payload: { clientX, clientY, strokeColor, fillColor, size },
      });
    } else if (boardState.toolActionType === mouseTypes.ERASING) {
      dispatchBoardStateActions({
        type: mouseTypes.ERASING,
        payload: { clientX, clientY },
      });
    }
  };

  /**
   * Handles the mouseup event on the canvas. This stops any ongoing drawing or erasing action.
   * 
   * @param {object} event - The mouseup event from the canvas.
   */
  const onMouseUp = (event) => {
    dispatchBoardStateActions({
      type: mouseTypes.CHANGE_TOOL_ACTION_TYPE,
      payload: toolActionType.NONE,
    });
  };

  /**
   * Initializes the state that will be passed down through the context. 
   * This includes the toolbar elements, the selected tool, the current drawing elements, 
   * and the functions to handle user interactions.
   */
  const initialState = {
    toolbarElements: toolbarItems, // List of tools available in the toolbar
    selectedToolbarItem: boardState.selectedToolbarItem, // Currently selected tool
    elements: boardState.elements, // All drawn elements on the canvas
    toolActionType: boardState.toolActionType, // Current action being performed (drawing, typing, etc.)
    handleOnClickToolbarItem, // Function to handle toolbar item clicks
    onMouseDown, // Function to handle mouse down events
    onMouseMove, // Function to handle mouse move events
    onMouseUp, // Function to handle mouse up events
  };

  /**
   * Provides the board context to its children. This allows any component 
   * wrapped by BoardProvider to access and interact with the board state.
   */
  return (
    <boardContext.Provider value={initialState}>
      {children}
    </boardContext.Provider>
  );
};

export default BoardProvider;
