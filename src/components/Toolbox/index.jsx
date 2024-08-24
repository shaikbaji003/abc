import React, { useContext } from "react";
import classes from "./index.module.css";
import {
  fillToolTypes,
  sizeToolTypes,
  strokeToolTypes,
  toolboxColors,
} from "../../constants/constants";
import cx from "classnames";
import boardContext from "../../store/board-context";
import toolboxContext from "../../store/toolbox-context";

/**
 * The Toolbox component provides controls for adjusting the properties of the selected tool.
 * These properties include stroke color, fill color, and size. The available options are
 * dynamically displayed based on the selected tool.
 */
const Toolbox = () => {
  // Extracting the selected tool from the board context
  const { selectedToolbarItem } = useContext(boardContext);

  // Extracting the current toolbox state and action handlers from the toolbox context
  const {
    toolboxState,
    onClickStroke,
    onClickFill,
    onChangeSize,
    // onClickCheckbox, // Uncomment if checkbox functionality is required
    // checkbox, // Uncomment if checkbox functionality is required
  } = useContext(toolboxContext);

  // Retrieve the properties of the selected tool
  const strokeColor = toolboxState[selectedToolbarItem].stroke;
  const fillColor = toolboxState[selectedToolbarItem].fill;
  const size = toolboxState[selectedToolbarItem].size;

  // Define available size options
  const sizeOptions = [1, 2, 4, 6, 8, 10];

  return (
    <div className={classes.container}>
      {/* Stroke Color Options */}
      {strokeToolTypes.includes(selectedToolbarItem) && (
        <div className={classes.selectOptionContainer}>
          <div className={classes.toolBoxLabel}>Color</div>
          {Object.values(toolboxColors).map((color) => (
            <div
              key={color} // Unique key for each color option
              className={cx(classes.colorBox, {
                [classes.activeColorBox]: strokeColor === color, // Highlight if selected
              })}
              style={{ backgroundColor: color }} // Set background color for display
              onClick={() => onClickStroke(selectedToolbarItem, color)} // Handle stroke color selection
            />
          ))}
        </div>
      )}

      {/* Fill Color Options */}
      {fillToolTypes.includes(selectedToolbarItem) && (
        <div className={classes.selectOptionContainer}>
          <div className={classes.toolBoxLabel}>Fill Shade</div>
          {Object.values(toolboxColors).map((color) => (
            <div
              key={color} // Unique key for each fill color option
              className={cx(classes.colorBox, {
                [classes.activeColorBox]: fillColor === color, // Highlight if selected
              })}
              style={{ backgroundColor: color }} // Set background color for display
              onClick={() => onClickFill(selectedToolbarItem, color)} // Handle fill color selection
            />
          ))}
        </div>
      )}

      {/* Size Options */}
      {sizeToolTypes.includes(selectedToolbarItem) && (
        <div className={classes.selectOptionContainer}>
          <div className={classes.toolBoxLabel}>Border Width</div>
          <div className={classes.sizeOptionsContainer}>
            {sizeOptions.map((option) => (
              <div
                key={option} // Unique key for each size option
                className={cx(classes.sizeOption, {
                  [classes.activeSizeOption]: size === option, // Highlight if selected
                })}
                style={{
                  width: option * 2, // Adjust size for visual representation
                  height: option * 2,
                  borderWidth: size === option ? 3 : 1, // Thicker border if selected
                }}
                onClick={() => onChangeSize(selectedToolbarItem, option)} // Handle size change
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Toolbox;
