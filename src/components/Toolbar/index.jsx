import React, { useContext } from "react";
import classes from "./index.module.css";
import cx from "classnames";
import boardContext from "../../store/board-context";

/**
 * The Toolbar component renders a set of tools that the user can select for drawing on the canvas.
 * It utilizes the boardContext to manage and display the available tools, as well as handle the
 * selection of a tool.
 */
const Toolbar = () => {
  // Extracting relevant states and actions from context
  const { toolbarElements, handleOnClickToolbarItem, selectedToolbarItem } = useContext(boardContext);

  // Render the toolbar with available tools
  return (
    <div className={classes.container}>
      {toolbarElements.map((items) => {
        return (
          <div
            key={items.id} // Unique key for each toolbar item
            className={cx(classes.toolItem, {
              [classes.active]: selectedToolbarItem === items.name, // Apply active class if the item is selected
            })}
            onClick={() => handleOnClickToolbarItem(items.name)} // Handle item click to select the tool
          >
            {items.icon} {/* Render the tool icon */}
          </div>
        );
      })}
    </div>
  );
};

export default Toolbar;
