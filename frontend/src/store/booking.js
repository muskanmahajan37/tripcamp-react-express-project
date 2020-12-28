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
const removeBookingPOJO = () => ({
  type: REMOVE_ONE_BOOKING
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
export const createOneBooking = ({ spotId, booking }) => async dispatch => {
  const res = await fetch(`/api/bookings`, {
    method: 'POST',
    body: {
      spotId,
      booking
    }
  }); //This fetch is a modified fetch, which already returns data after res.json()
  if (res.ok) {
    const fedback_booking = res.data.booking;
    dispatch(setBookingPOJO(fedback_booking));
  }
  return res;
}

const initialState = [];

const bookingReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_ONE_BOOKING:
      newState = JSON.parse(JSON.stringify(state));
      newState.push(JSON.parse(JSON.stringify(action.booking)));
      return newState;
    case SET_ALL_BOOKINGS:
      newState = JSON.parse(JSON.stringify([...state, ...action.bookings]));
      return newState;
    default:
      return state;
  }
};

export default bookingReducer;