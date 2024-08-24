import {
  toolboxColors,
  toolboxTypes,
  toolTypes,
} from "../../constants/constants";

export const toolboxReducer = (state, action) => {
  switch (action.type) {
    case toolboxTypes.CHANGE_STROKE: {
      const copiedState = { ...state };
      const { tool, stroke } = action.payload;
      copiedState[tool].stroke = stroke; //tool = var
      return copiedState;
    }
    case toolboxTypes.CHANGE_FILL: {
      const copiedState = { ...state };
      const { tool, fill } = action.payload;
      copiedState[tool].fill = fill;
      return copiedState;
    }
    case toolboxTypes.CHANGE_SIZE: {
      const copiedState = { ...state };
      const { tool, size } = action.payload;
      copiedState[tool].size = size;
      return copiedState;
    }

    default:
      break;
  }
};

export const initialReducerState = {
  [toolTypes.LINE]: { stroke: toolboxColors.BLACK, fill: null, size: 1 },
  [toolTypes.RECTANGLE]: { stroke: toolboxColors.BLACK, fill: null, size: 1 },
  [toolTypes.CIRCLE]: { stroke: toolboxColors.BLACK, fill: null, size: 1 },
  [toolTypes.ARROW]: { stroke: toolboxColors.BLACK, fill: null, size: 1 },
  [toolTypes.BRUSH]: { stroke: toolboxColors.BLACK, fill: null, size: null },
  [toolTypes.ERASER]: { stroke: null, fill: null, size: null },
};
