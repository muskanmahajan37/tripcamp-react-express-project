// frontend/src/store/review.js

import fetch from './csrf';

const SET_ONE_REVIEW = 'session/SET_ONE_REVIEW';
const REMOVE_ONE_REVIEW = 'session/REMOVE_ONE_REVIEW';
const SET_ALL_REVIEWS = 'session/SET_ALL_REVIEWS';
const REMOVE_ALL_REVIEW = 'session/REMOVE_ALL_REVIEW';

const setReviewPOJO = (review) => ({
  type: SET_ONE_REVIEW,
  review
});
const setAllReviewsPOJO = (reviews) => ({
  type: SET_ALL_REVIEWS,
  reviews
});
const removeReviewPOJO = () => ({
  type: REMOVE_ONE_REVIEW
});


export const getOneReview = (id) => async dispatch => {
  const res = await fetch(`/api/reviews/${id}`, {
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_review = res.data.review; //we need this user back from backend, NOT the provided
    dispatch(setReviewPOJO(fedback_review));
  }
  return res;
}

export const getAllReviews = () => async dispatch => {
  const res = await fetch(`/api/reviews`, {
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_reviews = res.data.reviews; //we need this user back from backend, NOT the provided
    dispatch(setAllReviewsPOJO(fedback_reviews));
  }
  return res;
}

export const createOneReview = ({ review }) => async dispatch => {
  const res = await fetch(`/api/reviews`, {
    method: 'POST',
    body: JSON.stringify({ review })
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_review = res.data.review;
    dispatch(setReviewPOJO(fedback_review));
  }
  return res;
}

const initialState = [];

const reviewReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_ONE_REVIEW:
      newState = JSON.parse(JSON.stringify(state));
      newState.push(JSON.parse(JSON.stringify(action.review)));
      return newState;
    case SET_ALL_REVIEWS:
      newState = JSON.parse(JSON.stringify([...state, ...action.reviews]));
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;