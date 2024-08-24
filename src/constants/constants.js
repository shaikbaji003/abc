import { LuRectangleHorizontal } from "react-icons/lu";
import {
  FaSlash,
  FaRegCircle,
  FaLongArrowAltRight,
  FaEraser,
} from "react-icons/fa";
import { GiPaintBrush } from "react-icons/gi";

// Tool types for the drawing application
export const toolTypes = {
  LINE: "LINE",                   
  RECTANGLE: "RECTANGLE",         
  CIRCLE: "CIRCLE",               
  ARROW: "ARROW",                 
  BRUSH: "BRUSH",                 
  ERASER: "ERASER",               
  TEXT: "TEXT",                   // Represents a text tool for adding text
};

// Mouse event types for handling user interactions
export const mouseTypes = {
  CHANGE_TOOL: "CHANGE_TOOL",               // When the user selects a different tool
  DRAW_DOWN: "DRAW_DOWN",                   // When the user starts drawing (mouse down)
  DRAW_MOVE: "DRAW_MOVE",                   // When the user is moving the mouse while drawing
  DRAW_UP: "DRAW_UP",                       // When the user stops drawing (mouse up)
  CHANGE_TOOL_ACTION_TYPE: "CHANGE_TOOL_ACTION_TYPE", // When the tool action type is changed
  ERASING: "ERASING",                       // When the eraser tool is being used
  TYPING: "TYPING",                         // When the text tool is being used for typing
};

// Toolbar items with corresponding icons, allowing users to select a tool
export const toolbarItems = [
  { id: 1, name: toolTypes.LINE, icon: <FaSlash /> },                 // Line tool with icon
  { id: 2, name: toolTypes.RECTANGLE, icon: <LuRectangleHorizontal /> }, // Rectangle tool with icon
  { id: 3, name: toolTypes.CIRCLE, icon: <FaRegCircle /> },           // Circle tool with icon
  { id: 4, name: toolTypes.ARROW, icon: <FaLongArrowAltRight /> },    // Arrow tool with icon
  { id: 5, name: toolTypes.BRUSH, icon: <GiPaintBrush /> },           // Brush tool with icon
  { id: 6, name: toolTypes.ERASER, icon: <FaEraser /> },              // Eraser tool with icon
  // { id: 7, name: toolTypes.TEXT, icon: <FaFont /> },               // Text tool with icon (commented out, can be enabled)
];

// Available colors in the toolbox for stroke, fill, and text
export const toolboxColors = {
  BLACK: "#000000",  // Black color
  RED: "#ff0000",    // Red color
  BLUE: "#0000ff",   // Blue color
  ORANGE: "#ffa500", // Orange color
  YELLOW: "#ffff00", // Yellow color
  WHITE: "#ffffff",  // White color
  PURPLE: "#800080", // Purple color
  PINK: "#ffc0cb",   // Pink color
  BROWN: "#a52a2a",  // Brown color
  GREY: "#808080",   // Grey color
  CYAN: "#00ffff",   // Cyan color
  LIME: "#00ff00",   // Lime color
  INDIGO: "#4b0082", // Indigo color
  VIOLET: "#8f00ff", // Violet color
};

// Toolbox action types to handle user interactions with the toolbox
export const toolboxTypes = {
  CHANGE_STROKE: "CHANGE_STROKE",             // Action to change the stroke color
  CHANGE_FILL: "CHANGE_FILL",                 // Action to change the fill color
  CHANGE_SIZE: "CHANGE_SIZE",                 // Action to change the size of the tool
  CHANGE_FONT: "CHANGE_FONT",                 // Action to change the font type for text
  CHANGE_FONT_SIZE: "CHANGE_FONT_SIZE",       // Action to change the font size for text
  CHANGE_TEXT_COLOR: "CHANGE_TEXT_COLOR",     // Action to change the text color
};

// Tools that support fill color
export const fillToolTypes = [
  toolTypes.RECTANGLE,  // Rectangle tool supports fill color
  toolTypes.CIRCLE,     // Circle tool supports fill color
];

// Tools that support stroke color
export const strokeToolTypes = [
  toolTypes.ARROW,      // Arrow tool supports stroke color
  toolTypes.RECTANGLE,  // Rectangle tool supports stroke color
  toolTypes.CIRCLE,     // Circle tool supports stroke color
  toolTypes.LINE,       // Line tool supports stroke color
  toolTypes.BRUSH,      // Brush tool supports stroke color
];

// Tools that allow size adjustment
export const sizeToolTypes = [
  toolTypes.ARROW,      // Arrow tool allows size adjustment
  toolTypes.RECTANGLE,  // Rectangle tool allows size adjustment
  toolTypes.CIRCLE,     // Circle tool allows size adjustment
  toolTypes.LINE,       // Line tool allows size adjustment
  toolTypes.TEXT,       // Text tool allows size adjustment
];

// Tool action types to define the current state of tool usage
export const toolActionType = {
  NONE: "NONE",         // No action is being performed
  DRAWING: "DRAWING",   // The user is drawing
  TYPING: "TYPING",     // The user is typing text
};

// Thresholds used for erasing elements
export const ELEMENT_ERASE_THRESHOLDS = 0.1;  // Defines the sensitivity of the eraser
