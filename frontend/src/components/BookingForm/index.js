// frontend/src/components/BookingForm/index.js

import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';

import * as sessionActions from '../../store/session';
import * as bookingActions from '../../store/booking';

import '../Forms.css';

export default function BookingFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const spots = useSelector(state => state.spots.allSpots);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [specialRequest, setSpecialRequest] = useState("");
  const [errors, setErrors] = useState([]);
  const bookingModalRef = useRef(null);
  const history = useHistory();
  const params = useParams();

  if (!sessionUser) {
    if (bookingModalRef.current)
      bookingModalRef.current.style.display = "none";
    console.log('booking', history);
    return <Redirect to='/login' />;
  }

  let spot;
  let spotInfo = <></>;

  //TODO: make this useEffect work so it won't reload spot data everytime user types a key
  // useEffect(() => {
  if (params && spots) spot = spots.find(spot => spot.id === Number(params.spotId));
  // console.log("spot", spot, params);
  spotInfo = spot && <>
    <p>Spot:</p>
    <p>{spot.name}</p>
    <p>{spot.streetAddress}</p>
  </>
  // });

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);

    return dispatch(bookingActions.createOneBooking({
      booking: {
        userId: sessionUser.id,
        spotId: spot.id,
        startDate,
        endDate,
        guests: numberOfGuests,
        specialRequest
      }
    }))
      .then(res => {
        if (bookingModalRef.current)
          bookingModalRef.current.style.display = "none";
        history.push('/');
      })
      .catch(res => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  };

  const handleCancelClick = e => {
    e.preventDefault();
    if (bookingModalRef.current)
      bookingModalRef.current.style.display = "none";
    history.push('/');
  }

  return (
    <div className="modal" ref={bookingModalRef}>
      <form
        className='form-container modal-content'
        onSubmit={handleSubmit}
      >
        <h3>Booking Form</h3>
        <div>
          {
            spotInfo
          }
        </div>
        <ul className='error-messages'>
          {errors.map((error, index) => <li key={index}>{error}</li>)}
        </ul>
        <div className="inputs-div">
          <div className="input-div">
            <label>Start Date</label>
            <input
              className='input-date'
              type='date'
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="input-div">
            <label>End Date</label>
            <input
              className='input-date'
              type='date'
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="input-div">
            <label>Number of Guests</label>
            <input
              className='input-number'
              type='number'
              value={numberOfGuests}
              min={1}
              onChange={e => setNumberOfGuests(e.target.value)}
              required
            />
          </div>
          <div className="input-div">
            <label>Special Request</label>
            <textarea
              className='input'
              type='text'
              value={specialRequest}
              onChange={e => setSpecialRequest(e.target.value)}
              // required // this is NOT required
            />
          </div>
        </div>
        <div className="buttons-div">
          <button
            className='button'
            type='submit'
          >Submit</button>
          <button
            className='button button-Reset'
            onClick={handleCancelClick}
          > Cancel </button>
        </div>
      </form>
    </div>
  );
}
