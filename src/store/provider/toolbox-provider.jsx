import React, { useReducer, useState } from "react";
import toolboxContext from "../toolbox-context";
import {
  initialReducerState,
  toolboxReducer,
} from "../reducer/toolbox-reducer";
import { toolboxTypes } from "../../constants/constants";

const ToolboxProvider = ({ children }) => {
  /**
   * useReducer hook manages the state of the toolbox, handling actions such as 
   * changing stroke color, fill color, and size. This structured approach allows 
   * for scalable state management as the application grows.
   */
  const [toolboxState, dispatchToolboxActions] = useReducer(
    toolboxReducer,
    initialReducerState
  );

  /**
   * useState hook for managing the state of a checkbox, which may be used for 
   * toggling additional features or settings within the toolbox.
   */
  const [checkbox, setCheckbox] = useState(false);

  /**
   * Handles the change of stroke color for a given tool. Dispatches an action 
   * to update the stroke color in the toolbox state.
   * 
   * @param {string} tool - The tool for which the stroke color is being changed.
   * @param {string} stroke - The new stroke color.
   */
  const onClickStroke = (tool, stroke) => {
    dispatchToolboxActions({
      type: toolboxTypes.CHANGE_STROKE,
      payload: { tool, stroke },
    });
  };

  /**
   * Handles the change of fill color for a given tool. Dispatches an action 
   * to update the fill color in the toolbox state.
   * 
   * @param {string} tool - The tool for which the fill color is being changed.
   * @param {string} fill - The new fill color.
   */
  const onClickFill = (tool, fill) => {
    dispatchToolboxActions({
      type: toolboxTypes.CHANGE_FILL,
      payload: { tool, fill },
    });
  };

  /**
   * Handles the change of size for a given tool. Dispatches an action to 
   * update the size of the tool in the toolbox state.
   * 
   * @param {string} tool - The tool for which the size is being changed.
   * @param {number} size - The new size.
   */
  const onChangeSize = (tool, size) => {
    dispatchToolboxActions({
      type: toolboxTypes.CHANGE_SIZE,
      payload: { tool, size },
    });
  };

  /**
   * Toggles the checkbox state, which could be used to enable or disable 
   * certain features or settings within the toolbox.
   */
  const onClickCheckbox = () => {
    setCheckbox(!checkbox);
  };

  /**
   * Initializes the state that will be passed down through the context. 
   * This includes the current toolbox state and the functions to handle 
   * user interactions like changing colors, sizes, and toggling the checkbox.
   */
  const initialState = {
    toolboxState, // Current state of the toolbox including tools' colors and sizes
    onClickStroke, // Function to handle stroke color changes
    onClickFill, // Function to handle fill color changes
    onChangeSize, // Function to handle tool size changes
    onClickCheckbox, // Function to handle checkbox toggling
    checkbox, // State of the checkbox
  };

  /**
   * Provides the toolbox context to its children. Any component wrapped 
   * by ToolboxProvider can access and interact with the toolbox state and actions.
   */
  return (
    <toolboxContext.Provider value={initialState}>
      {children}
    </toolboxContext.Provider>
  );
};

export default ToolboxProvider;
