// frontend/src/store/booking.js

import fetch from './csrf';

const SET_ONE_BOOKING = 'session/SET_ONE_BOOKING';
const SET_ALL_BOOKINGS = 'session/SET_ALL_BOOKINGS';
const REMOVE_ONE_BOOKING = 'session/REMOVE_ONE_BOOKING';

const setBookingPOJO = (booking) => ({
  type: SET_ONE_BOOKING,
  booking
});
const setAllBookingsPOJO = (bookings) => ({
  type: SET_ALL_BOOKINGS,
  bookings
});
const removeBookingPOJO = (bookingId) => ({
  type: REMOVE_ONE_BOOKING,
  bookingId
});


export const getOneBooking = (id) => async dispatch => {
  const res = await fetch(`/api/bookings/${id}`, {
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_booking = res.data.booking; //we need this user back from backend, NOT the provided
    dispatch(setBookingPOJO(fedback_booking));
  }
  return res;
}

export const getAllBookings = () => async dispatch => {
  const res = await fetch(`/api/bookings`, {
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_bookings = res.data.bookings; //we need this user back from backend, NOT the provided
    dispatch(setAllBookingsPOJO(fedback_bookings));
  }
  return res;
}
export const createOneBooking = ({ booking }) => async dispatch => {
  const res = await fetch(`/api/bookings`, {
    method: 'POST',
    body: JSON.stringify({ booking })
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_booking = res.data.booking;
    dispatch(setBookingPOJO(fedback_booking));
  }
  return res;
}
export const modifyOneBooking = ( booking ) => async dispatch => {
  const res = await fetch(`/api/bookings`, {
    method: 'PATCH',
    body: JSON.stringify({ booking })
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_booking = res.data.booking;
    dispatch(setBookingPOJO(fedback_booking));
  }
  return res.data.booking;
}

export const deleteOneBooking = ( bookingId ) => async dispatch => {
  const res = await fetch(`/api/bookings/${bookingId}`, {
    method: 'DELETE',
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_bookingId = Number(res.data.bookingId);
    dispatch(removeBookingPOJO(fedback_bookingId));
  }
  return res;
}

const initialState = [];

const compare = (bk1, bk2) => {
  let comparison = 0;
  if (bk1.id > bk2.id) {
    comparison = 1;
  } else if (bk1.id < bk2.id) {
    comparison = -1;
  }
  return comparison;
}

const bookingReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_ONE_BOOKING:
      newState = JSON.parse(JSON.stringify(state.filter(bk => bk.id !== action.booking.id)));
      newState.push(JSON.parse(JSON.stringify(action.booking)));      
      return newState.sort(compare);
    case SET_ALL_BOOKINGS:
      // newState = JSON.parse(JSON.stringify([...state, ...action.bookings]));
      newState = JSON.parse(JSON.stringify([...action.bookings]));
      return newState.sort(compare);
    case REMOVE_ONE_BOOKING:
      newState = JSON.parse(JSON.stringify(state.filter(booking =>
        booking.id !== action.bookingId
      )));
      return newState.sort(compare);
    default:
      return state;
  }
};

export default bookingReducer;