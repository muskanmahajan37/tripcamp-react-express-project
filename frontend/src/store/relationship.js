// frontend/src/store/relationship.js

import fetch from './csrf';

const SET_ONE_RELATION = 'session/SET_ONE_RELATION';
const SET_ALL_RELATIONS = 'session/SET_ALL_RELATIONS';
const REMOVE_ONE_RELATION = 'session/REMOVE_ONE_RELATION';

const setRelationshipPOJO = (relationship) => ({
  type: SET_ONE_RELATION,
  relationship
});
const setAllRelationshipsPOJO = (relationships) => ({
  type: SET_ALL_RELATIONS,
  relationships
});
const removeRelationshipPOJO = () => ({
  type: REMOVE_ONE_RELATION
});


export const getOneRelationship = (id) => async dispatch => {
  const res = await fetch(`/api/relationships/${id}`, {
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_relationship = res.data.relationship; //we need this user back from backend, NOT the provided
    dispatch(setRelationshipPOJO(fedback_relationship));
  }
  return res;
}

export const getAllRelationships = (myUserId = undefined) => async dispatch => {
  let link = '/api/relationships';
  if(myUserId) link += `/users/${myUserId}`
  const res = await fetch(link, {
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_relationships = res.data.relationships; //we need this user back from backend, NOT the provided
    dispatch(setAllRelationshipsPOJO(fedback_relationships));
  }
  return res;
}
export const createOneRelationship = ({ relationship }) => async dispatch => {
  const res = await fetch(`/api/relationships`, {
    method: 'POST',
    body: JSON.stringify({ relationship })
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_relationship = res.data.relationship;
    dispatch(setRelationshipPOJO(fedback_relationship));
  }
  return res;
}

const initialState = [];

const relationshipReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_ONE_RELATION:
      newState = JSON.parse(JSON.stringify(state));
      newState.push(JSON.parse(JSON.stringify(action.relationship)));
      return newState;
    case SET_ALL_RELATIONS:
      newState = JSON.parse(JSON.stringify([...state, ...action.relationships]));
      return newState;
    default:
      return state;
  }
};

export default relationshipReducer;