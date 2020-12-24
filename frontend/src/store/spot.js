// frontend/src/store/spot.js

import fetch from './csrf';

const SET_ONE_SPOT = 'session/SET_ONE_SPOT';
const REMOVE_ONE_SPOT = 'session/REMOVE_ONE_SPOT';
const SET_ALL_SPOTS = 'session/SET_ALL_SPOTS';
const REMOVE_ALL_SPOT = 'session/REMOVE_ALL_SPOT';

const setSpotPOJO = (spot) => ({
  type: SET_ONE_SPOT,
  spot
});
const setAllSpotsPOJO = (spots) => ({
  type: SET_ALL_SPOTS,
  spots
});
const removeSpotPOJO = () => ({
  type: REMOVE_ONE_SPOT
});


export const getOneSpot = (id) => async dispatch => {
  const res = await fetch(`/api/spots/${id}`, {
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_spot = res.data.spot; //we need this user back from backend, NOT the provided
    dispatch(setSpotPOJO(fedback_spot));
  }
  return res;
}

export const getAllSpots = () => async dispatch => {
  const res = await fetch(`/api/spots`, {
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_spots = res.data.spots; //we need this user back from backend, NOT the provided
    dispatch(setAllSpotsPOJO(fedback_spots));
  }
  return res;
}

const initialState = [];

const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_ONE_SPOT:
      newState = JSON.parse(JSON.stringify(state));
      newState.push(JSON.parse(JSON.stringify(action.spot)));
      return newState;
    case SET_ALL_SPOTS:
      newState = JSON.parse(JSON.stringify([...state, ...action.spots]));
      return newState;
    default:
      return state;
  }
};

export default spotReducer;