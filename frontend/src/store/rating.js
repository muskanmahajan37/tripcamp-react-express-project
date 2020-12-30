// frontend/src/store/rating.js

const SET_ONE_RATING = 'session/SET_ONE_RATING';
const REMOVE_ONE_RATING = 'session/REMOVE_ONE_RATING';

export const setRatingPOJO = (rating) => ({
  type: SET_ONE_RATING,
  rating
});

export const removeRatingPOJO = () => ({
  type: REMOVE_ONE_RATING
});

const initialState = [];

const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ONE_RATING:
      return [action.rating];
    default:
      return state;
  }
};

export default ratingReducer;