// frontend/src/store/session.js

import fetch from './csrf';

const SET_SESSION_USER = 'session/SET_SESSION_USER';
const REMOVE_SESSION_USER = 'session/REMOVE_SESSION_USER';

const addSessionUser = (user) => ({
  type: SET_SESSION_USER,
  user
});
const removeSessionUser = () =>({
  type: REMOVE_SESSION_USER
});

export const loginUser = (providedUser) => async dispatch => {
  const res = await fetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential: (providedUser.email? providedUser.email: providedUser.username), password: providedUser.password })
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if(res.ok){
    const fedback_user = res.data; //we need this user back from backend, NOT the provided
    console.log('res.data', res.data);
    dispatch(addSessionUser(fedback_user));
  }
}

export const logoutUser = () => async dispatch => {
  const res = await fetch('/api/session', {
    method: 'DELETE',
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if(res.ok){
    dispatch(removeSessionUser());
  }
}

const initialState = {
  user: null
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION_USER:
      return { user: action.user };
    case REMOVE_SESSION_USER:
      return initialState;
    default:
      return state;
  }
}

export default sessionReducer;