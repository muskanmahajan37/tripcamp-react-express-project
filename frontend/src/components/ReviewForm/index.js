// frontend/src/components/ReviewForm/index.js

import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';

import * as sessionActions from '../../store/session';
import * as reviewActions from '../../store/review';

import Rating from '../Rating';

import '../Forms.css';

export default function ReviewFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const spots = useSelector(state => state.spots);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(null);
  const [errors, setErrors] = useState([]);
  const reviewModalRef = useRef(null);
  const history = useHistory();
  const params = useParams();

  if (!sessionUser) {
    if (reviewModalRef.current)
      reviewModalRef.current.style.display = "none";
    console.log('review', history);
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

    return dispatch(reviewActions.createOneReview({
      review: {
        userId: sessionUser.id,
        spotId: spot.id,
        title,
        body,
        rating,
      }
    }))
      .then(res => {
        if (reviewModalRef.current)
          reviewModalRef.current.style.display = "none";
        history.push('/');
      })
      .catch(res => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  };

  const handleCancelClick = e => {
    e.preventDefault();
    if (reviewModalRef.current)
      reviewModalRef.current.style.display = "none";
    history.push('/');
  }

  return (
    <div className="modal" ref={reviewModalRef}>
      <form
        className='form-container modal-content'
        onSubmit={handleSubmit}
      >
        <h3>Review Form</h3>
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
            <label>Title</label>
            <input
              className='input'
              type='text'
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="input-div">
            <label>Body</label>
            <textarea
              className='input'
              type='text'
              value={body}
              onChange={e => setBody(e.target.value)}
              required
            />
          </div>
          <div className="input-div">
            <label>Rating</label>
            <Rating userChangeable={true} />
            {/* <input
              className='input-number'
              type='number'
              value={rating}
              min={1}
              onChange={e => setRating(e.target.value)}
              required
            /> */}
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
