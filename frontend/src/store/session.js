// frontend/src/store/session.js

import fetch from './csrf';

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
// const RESTORE_USER = 'session/RESTORE_USER';

const setUserPOJO = (user) => ({
  type: SET_USER,
  user
});
const removeUserPOJO = () =>({
  type: REMOVE_USER
});

// const restoreUserPOJO = () => ({
//   type: RESTORE_USER
// });

export const login = ({ credential, password }) => async dispatch => {
  const res = await fetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password})
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if(res.ok){
    const fedback_user = res.data.user; //we need this user back from backend, NOT the provided
    dispatch(setUserPOJO(fedback_user));
  }
  return res;
}

export const logout = () => async dispatch => {
  const res = await fetch('/api/session', {
    method: 'DELETE',
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if(res.ok){
    dispatch(removeUserPOJO());
  }
  return res;
}

export const restoreUser = () => async dispatch => {
  const res = await fetch('/api/session'); //This fetch is a modified fetch, which already returns data after res.json()
  if(res.ok){
    const fedback_user = res.data.user; //we need this user back from backend, NOT the provided
    dispatch(setUserPOJO(fedback_user));
  }
  return res;
};

export const signup = ({ username, email, password }) => async dispatch => {
  const res = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ username, email, password})
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if(res.ok){
    const fedback_user = res.data.user; //we need this user back from backend, NOT the provided
    dispatch(setUserPOJO(fedback_user));
  }
  return res;
}

const initialState = {
  user: null
};

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
}

export default sessionReducer;