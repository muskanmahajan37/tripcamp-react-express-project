// frontend/src/store/rating.js

import fetch from './csrf';

const SET_ONE_RATING = 'session/SET_ONE_RATING';
const SET_ALL_RATINGS = 'session/SET_ALL_RATINGS';
const REMOVE_ONE_RATING = 'session/REMOVE_ONE_RATING';

export const setRatingPOJO = (rating) => ({
  type: SET_ONE_RATING,
  rating
});
export const setAllRatingsPOJO = (ratings) => ({
  type: SET_ALL_RATINGS,
  ratings
});
export const removeRatingPOJO = () => ({
  type: REMOVE_ONE_RATING
});

const initialState = [];

const ratingReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_ONE_RATING:
      newState = JSON.parse(JSON.stringify(state));
      newState.push(JSON.parse(JSON.stringify(action.rating)));
      return newState;
    case SET_ALL_RATINGS:
      newState = JSON.parse(JSON.stringify([...state, ...action.ratings]));
      return newState;
    default:
      return state;
  }
};

export default ratingReducer;