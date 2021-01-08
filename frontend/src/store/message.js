// frontend/src/store/message.js

import fetch from './csrf';

const SET_ONE_MESSAGE = 'session/SET_ONE_MESSAGE';
const REMOVE_ONE_MESSAGE = 'session/REMOVE_ONE_MESSAGE';
const SET_ALL_MESSAGES = 'session/SET_ALL_MESSAGES';
const REMOVE_ALL_MESSAGE = 'session/REMOVE_ALL_MESSAGE';

const setMessagePOJO = (message) => ({
  type: SET_ONE_MESSAGE,
  message
});
const setAllMessagesPOJO = (messages) => ({
  type: SET_ALL_MESSAGES,
  messages
});
const removeMessagePOJO = () => ({
  type: REMOVE_ONE_MESSAGE
});


export const getOneMessage = (id) => async dispatch => {
  const res = await fetch(`/api/messages/${id}`, {
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_message = res.data.message; //we need this user back from backend, NOT the provided
    dispatch(setMessagePOJO(fedback_message));
  }
  return res;
}

export const getAllMessages = (friendId = undefined) => async dispatch => {
  let link = '/api/messages';
  if(friendId) link += `/friends/${friendId}`;
  const res = await fetch(link, {
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_messages = res.data.messages; //we need this user back from backend, NOT the provided
    dispatch(setAllMessagesPOJO(fedback_messages));
  }
  return res;
}

export const createOneMessage = (message) => async dispatch => {
  const res = await fetch(`/api/messages`, {
    method: 'POST',
    body: JSON.stringify({ message })
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_message = res.data.message;
    dispatch(setMessagePOJO(fedback_message));
  }
  return res;
}
export const readOneMessage = (messageId) => async dispatch => {
  const res = await fetch(`/api/messages/${messageId}`, {
    method: 'PATCH',
    // body: JSON.stringify({ messageId })
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_message = res.data.message;
    dispatch(setMessagePOJO(fedback_message));
  }
  return res;
}

const initialState = [];

const messageReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_ONE_MESSAGE:
      newState = JSON.parse(JSON.stringify(state));
      newState.push(JSON.parse(JSON.stringify(action.message)));
      return newState;
    case SET_ALL_MESSAGES:
      newState = JSON.parse(JSON.stringify([...state, ...action.messages]));
      return newState;
    default:
      return state;
  }
};

export default messageReducer;