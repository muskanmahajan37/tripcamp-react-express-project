// frontend/src/store/media.js

import fetch from './csrf';

const SET_ONE_MEDIUM = 'session/SET_ONE_MEDIUM';
const SET_ALL_MEDIA = 'session/SET_ALL_MEDIA';
const REMOVE_ONE_MEDIUM = 'session/REMOVE_ONE_MEDIUM';

const setMediumPOJO = (medium) => ({
  type: SET_ONE_MEDIUM,
  medium
});
const setAllMediaPOJO = (media) => ({
  type: SET_ALL_MEDIA,
  media
});
const removeMediumPOJO = () => ({
  type: REMOVE_ONE_MEDIUM
});


export const getOneMedium = (id) => async dispatch => {
  const res = await fetch(`/api/media/${id}`, {
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_medium = res.data.medium; //we need this user back from backend, NOT the provided
    dispatch(setMediumPOJO(fedback_medium));
  }
  return res;
}

export const getAllMedia = () => async dispatch => {
  const res = await fetch(`/api/media`, {
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_media = res.data.media; //we need this user back from backend, NOT the provided
    dispatch(setAllMediaPOJO(fedback_media));
  }
  return res;
}
export const createOneMedium = ({ medium }) => async dispatch => {
  const res = await fetch(`/api/media`, {
    method: 'POST',
    body: JSON.stringify({ medium })
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_medium = res.data.medium;
    dispatch(setMediumPOJO(fedback_medium));
  }
  return res;
}

const initialState = [];

const mediumReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_ONE_MEDIUM:
      newState = JSON.parse(JSON.stringify(state));
      newState.push(JSON.parse(JSON.stringify(action.medium)));
      return newState;
    case SET_ALL_MEDIA:
      // newState = JSON.parse(JSON.stringify([...state, ...action.media]));
      newState = JSON.parse(JSON.stringify([...action.media]));
      return newState;
    default:
      return state;
  }
};

export default mediumReducer;