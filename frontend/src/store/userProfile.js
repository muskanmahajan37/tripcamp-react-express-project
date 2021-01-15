// frontend/src/store/userProfile.js

import fetch from './csrf';


const UPDATE_PROFILE = 'user/UPDATE_PROFILE';
const GET_PROFILE = 'user/GET_PROFILE';

const updateProfilePOJO = (userProfile) => ({
  type: UPDATE_PROFILE,
  userProfile
});


export const getUserProfile = ( userId) => async dispatch => {
  const res = await fetch(`/api/users/${userId}/userProfile`, {
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_userProfile = res.data.userProfile;
    dispatch(updateProfilePOJO(fedback_userProfile));
  }
  return res;
}


export const updateUserProfile = ({ userProfile }) => async dispatch => {
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

const userProfileReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case UPDATE_PROFILE:
      // newState = JSON.parse(JSON.stringify([...state, action.userProfile]));
      newState = JSON.parse(JSON.stringify([action.userProfile]));
      return newState;
    default:
      return state;
  }
};

export default userProfileReducer;