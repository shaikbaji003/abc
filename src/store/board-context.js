import { createContext } from "react";

const boardContext = createContext({
  selectedToolbarItem: "",
  elements: [],
  handleOnClickToolbarItem: () => {},
  toolbarElements: [],
  onMouseDown: () => {},
  onMouseMove: () => {},
  onMouseUp: () => {},
  toolActionType: "",
  
});

export default boardContext;
