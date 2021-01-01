// frontend/src/store/friend.js

import fetch from './csrf';

const SET_ONE_FRIEND = 'session/SET_ONE_FRIEND';
const SET_ALL_FRIENDS = 'session/SET_ALL_FRIENDS';
const REMOVE_ONE_FRIEND = 'session/REMOVE_ONE_FRIEND';

const setFriendPOJO = (friend) => ({
  type: SET_ONE_FRIEND,
  friend
});
const setAllFriendsPOJO = (friends) => ({
  type: SET_ALL_FRIENDS,
  friends
});
const removeFriendPOJO = () => ({
  type: REMOVE_ONE_FRIEND
});


export const getOneFriend = (id) => async dispatch => {
  const res = await fetch(`/api/friends/${id}`, {
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_friend = res.data.friend; //we need this user back from backend, NOT the provided
    dispatch(setFriendPOJO(fedback_friend));
  }
  return res;
}

export const getAllFriends = () => async dispatch => {
  const res = await fetch(`/api/friends`, {
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_friends = res.data.friends; //we need this user back from backend, NOT the provided
    dispatch(setAllFriendsPOJO(fedback_friends));
  }
  return res;
}
export const requestOneFriend = ({ friend }) => async dispatch => {
  const res = await fetch(`/api/friends`, {
    method: 'POST',
    body: JSON.stringify({ friend })
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_friend = res.data.friend;
    dispatch(setFriendPOJO(fedback_friend));
  }
  return res;
}

const initialState = [];

const friendReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_ONE_FRIEND:
      newState = JSON.parse(JSON.stringify(state));
      newState.push(JSON.parse(JSON.stringify(action.friend)));
      return newState;
    case SET_ALL_FRIENDS:
      newState = JSON.parse(JSON.stringify([...state, ...action.friends]));
      return newState;
    default:
      return state;
  }
};

export default friendReducer;