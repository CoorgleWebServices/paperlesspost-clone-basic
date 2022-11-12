import {
  DELETE_STICKER,
  SET_BACKDROP,
  SET_ENVELOPE,
  SET_HOVERED_ITEM_ID,
  SET_LINER,
  SET_SELECTED_ITEM_ID,
  SET_SELECTED_TOOL,
  SET_STAMP,
  SET_TARGET,
  UPDATE_DESIGN,
} from "../type";

const initialState = {
  target: "card",
  tool: { id: "text", label: "Add Text" },
  backdrop: "1.jpg",
  draw: {
    card: {
      stickers: [],
      texts: [],
    },
    envelope: [],
  },
  selectedItemId: null,
  hoveredItemId: null,
  envelope: "#A45023",
  liner: "1.png",
  stamp: "1.png",
};

const EditorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_TOOL:
      return { ...state, tool: action.payload };
    case SET_BACKDROP:
      return { ...state, backdrop: action.payload };
    case SET_LINER:
      return { ...state, liner: action.payload };
    case SET_STAMP:
      return { ...state, stamp: action.payload };
    case SET_TARGET:
      return { ...state, target: action.payload };
    case SET_HOVERED_ITEM_ID:
      return { ...state, hoveredItemId: action.payload };
    case SET_SELECTED_ITEM_ID:
      return { ...state, selectedItemId: action.payload };
    case UPDATE_DESIGN:
      const { action: flag, data, target, type } = action.payload;
      let cloneArr = state.draw[target][type];
      if (flag === "create") {
        cloneArr.push(data);
      } else {
        let selectedIndex = 0;
        cloneArr.map((item, i) => {
          if (item.id === data.id) selectedIndex = i;
        });
        cloneArr.splice(selectedIndex, 1, data);
      }
      return {
        ...state,
        draw: {
          ...state.draw,
          [target]: { ...state.draw[target], [type]: cloneArr },
        },
      };
    case DELETE_STICKER:
      let cloneStickers = state.draw.card.stickers;
      let selectedIndex = 0;
      cloneStickers.map((item, i) => {
        if (item.id === action.payload) selectedIndex = i;
      });
      cloneStickers.splice(selectedIndex, 1);
      return {
        ...state,
        draw: {
          ...state.draw,
          card: { ...state.draw.card, stickers: cloneStickers },
        },
      };
    case SET_ENVELOPE:
      return { ...state, envelope: action.payload };
    default:
      return state;
  }
};

export default EditorReducer;
