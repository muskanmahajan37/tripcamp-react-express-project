// frontend/src/store/userProfile.js

import fetch from './csrf';


const UPDATE_PROFILE = 'user/UPDATE_PROFILE';

const updateProfilePOJO = (userProfile) => ({
  type: UPDATE_PROFILE,
  userProfile
});


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

const userProfileReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case UPDATE_PROFILE:
      newState = JSON.parse(JSON.stringify([...state, action.userProfile]));
      return newState;
    default:
      return state;
  }
};

export default userProfileReducer;