// frontend/src/store/ownership.js

const SET_ONE_OWNERSHIP = 'session/SET_ONE_OWNERSHIP';
const REMOVE_ONE_OWNERSHIP = 'session/REMOVE_ONE_OWNERSHIP';

export const setOwnershipPOJO = (ownership) => ({
  type: SET_ONE_OWNERSHIP,
  ownership
});

export const removeOwnershipPOJO = () => ({
  type: REMOVE_ONE_OWNERSHIP
});

const initialState = [];

const ownershipReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ONE_OWNERSHIP:
      return [action.ownership];
    default:
      return state;
  }
};

export default ownershipReducer;