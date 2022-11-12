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

export const deleteSticker = (data) => async (dispatch) => {
  dispatch({ type: DELETE_STICKER, payload: data });
};

export const setBackdrop = (data) => async (dispatch) => {
  dispatch({ type: SET_BACKDROP, payload: data });
};

export const setLiner = (data) => async (dispatch) => {
  dispatch({ type: SET_LINER, payload: data });
};

export const setHoveredItemId = (data) => async (dispatch) => {
  dispatch({ type: SET_HOVERED_ITEM_ID, payload: data });
};

export const setSelectedItemId = (data) => async (dispatch) => {
  dispatch({ type: SET_SELECTED_ITEM_ID, payload: data });
};

export const setSelectedTool = (data) => async (dispatch) => {
  dispatch({ type: SET_SELECTED_TOOL, payload: data });
};

export const setStamp = (data) => async (dispatch) => {
  dispatch({ type: SET_STAMP, payload: data });
};

export const setTarget = (data) => async (dispatch) => {
  dispatch({ type: SET_TARGET, payload: data });
};

export const setEnvelope = (data) => async (dispatch) => {
  dispatch({ type: SET_ENVELOPE, payload: data });
};

export const updateDesign = (data) => async (dispatch) => {
  dispatch({ type: UPDATE_DESIGN, payload: data });
};
