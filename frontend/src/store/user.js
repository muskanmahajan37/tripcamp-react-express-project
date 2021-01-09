// frontend/src/store/user.js

import fetch from './csrf';

const SET_ONE_FRIEND = 'user/SET_ONE_FRIEND';
const SET_ALL_FRIENDS = 'user/SET_ALL_FRIENDS';
const REMOVE_ONE_FRIEND = 'user/REMOVE_ONE_FRIEND';
const UPDATE_PROFILE = 'user/UPDATE_PROFILE';

const setFriendPOJO = (friend) => ({
  type: SET_ONE_FRIEND,
  friend
});
const setAllFriendsPOJO = (friends) => ({
  type: SET_ALL_FRIENDS,
  friends
});
// const removeFriendPOJO = () => ({
//   type: REMOVE_ONE_FRIEND
// });

const updateProfilePOJO = (userProfile) => ({
  type: UPDATE_PROFILE,
  userProfile
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

export const updateProfile = ({ userProfile }) => async dispatch => {
  const res = await fetch(`/api/users/${userProfile.userId}/userProfile`, {
    method: 'POST',
    body: JSON.stringify({ userProfile })
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_userProfile = res.data.userProfile;
    dispatch(updateProfilePOJO(fedback_userProfile));
  }
  return res;
}

const initialState = [];

const userReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_ONE_FRIEND:
      newState = JSON.parse(JSON.stringify(state));
      newState.push(JSON.parse(JSON.stringify(action.friend)));
      return newState;
    case SET_ALL_FRIENDS:
      newState = JSON.parse(JSON.stringify([...state, ...action.friends]));
      return newState;
    case UPDATE_PROFILE:
      newState = JSON.parse(JSON.stringify(state));
      const user = newState.find(user => user.id === action.userProfile.userId);
      user.userProfile = action.userProfile;
      return newState;
    default:
      return state;
  }
};

export default userReducer;