// frontend/src/store/spot.js

import fetch from './csrf';

const SET_ONE_SPOT = 'spot/SET_ONE_SPOT';
const REMOVE_CURRENT_SPOT = 'spot/REMOVE_CURRENT_SPOT';
const SET_ALL_SPOTS = 'spot/SET_ALL_SPOTS';
const SET_ALL_MY_SPOTS = 'spot/SET_ALL_MY_SPOTS';
const ADD_REVIEW_TO_SPOT = 'spot/ADD_REVIEW_TO_SPOT';
// const REMOVE_ALL_SPOT = 'spot/REMOVE_ALL_SPOT';

export const setSpotPOJO = (spot) => ({
  type: SET_ONE_SPOT,
  spot
});
export const setAllSpotsPOJO = (spots) => ({
  type: SET_ALL_SPOTS,
  spots
});
export const setAllMySpotsPOJO = (spots) => ({
  type: SET_ALL_MY_SPOTS,
  spots
});
export const removeCurrentSpot = () => ({
  type: REMOVE_CURRENT_SPOT
});

export const addReviewToSpot = (review) => ({
  type: ADD_REVIEW_TO_SPOT,
  review
});

export const getOneSpot = (id, withReviews = false) => async dispatch => {
  let link = `/api/spots/${id}`;
  if (withReviews) link += '/reviews';
  const res = await fetch(link, {
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_spot = res.data.spot; //we need this user back from backend, NOT the provided
    dispatch(setSpotPOJO(fedback_spot));
  }
  return res;
}

export const getAllSpots = (withReviews = false) => async dispatch => {
  let link = '/api/spots';
  if (withReviews) link += '/reviews';
  const res = await fetch(link, {
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_spots = res.data.spots; //we need this user back from backend, NOT the provided
    dispatch(setAllSpotsPOJO(fedback_spots));
  }
  return res;
}

export const createOneSpot = ({ spot }) => async dispatch => {
  const res = await fetch(`/api/spots`, {
    method: 'POST',
    body: JSON.stringify({ spot })
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_spot = res.data.spot;
    dispatch(setSpotPOJO(fedback_spot));
  }
  return res;
}


const initialState = { allSpots: [] };

const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_ONE_SPOT:
      newState = Object.assign({}, state);
      if (!newState.allSpots.includes(action.spot))
        newState.allSpots.push(action.spot);
      newState.currentSpot = action.spot;
      return newState;
    case SET_ALL_SPOTS:
      newState = Object.assign({}, state);
      delete newState.currentSpot;
      // newState.allSpots = [...newState.allSpots, ...action.spots];
      newState.allSpots = [...action.spots];
      return newState;
    case SET_ALL_MY_SPOTS:
      newState = Object.assign({}, state);      
      newState.allMySpots = [...action.spots];
      return newState;
    case REMOVE_CURRENT_SPOT:
      newState = Object.assign({}, state);
      delete newState.currentSpot;
      return newState;
    case ADD_REVIEW_TO_SPOT:
      newState = Object.assign({}, state);
      const spot = state.allSpots.find(spot => spot.id === action.review.spotId);
      if (spot) {
        spot.Reviews.push(action.review);
        state.allSpots = state.allSpots.filter(spot => spot.id !== action.review.spotId);
        state.allSpots.push(spot);
        //TODO: make this code more efficient, maybe using splice to remove the spot
      }
      return newState;
    default:
      return state;
  }
};

export default spotReducer;