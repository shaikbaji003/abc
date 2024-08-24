import { createContext } from "react";

const toolboxContext = createContext({
  toolboxState: {},
  onClickStroke: () => {},
  onClickFill: () => {},
  onChangeSize: () => {},
  onClickCheckbox: () => {},
  checkbox: false
});

export default toolboxContext;
