// frontend/src/components/ReviewForm/index.js

import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';

import * as sessionActions from '../../store/session';
import * as reviewActions from '../../store/review';

import Rating from '../Rating';

import '../Forms.css';
import { nanoid } from 'nanoid';

export default function ReviewFormModal({ divClass = "modal", formContentClass = 'form-container modal-content' }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const spots = useSelector(state => state.spots);
  const ratings = useSelector(state => state.ratings);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState([]);
  const reviewModalRef = useRef(null);
  const history = useHistory();
  const params = useParams();
  const [rating, setRating] = useState(null);
  let realtimeRating;
  const [spot, setSpot] = useState(null);

  useEffect(() => {
    realtimeRating = ratings[ratings.length - 1];
    setRating(realtimeRating);
    console.log('realtimeRating', realtimeRating);
  }, [ratings]);

  useEffect(() => {
    if (params && spots) {
      setSpot(spots.find(spot => spot.id === Number(params.spotId)));
      realtimeRating = undefined;
    }
    console.log("spot", spot, params, realtimeRating);
  }, [params]);

  if (!sessionUser) {
    if (reviewModalRef.current)
      reviewModalRef.current.style.display = "none";
    console.log('review', history);
    return <Redirect to='/login' />;
  }

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);

    if (!realtimeRating)
      return setErrors(["Select a rating"]);

    return dispatch(reviewActions.createOneReview({
      review: {
        userId: sessionUser.id,
        spotId: spot.id,
        title,
        body,
        rating: realtimeRating
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
    <div className={divClass} ref={reviewModalRef}>
      <form
        className={formContentClass}
        onSubmit={handleSubmit}
      // onClick={handleFormClick}
      >
        <h3>Review Form</h3>
        <div>
          {
            spot && <>
              <p>Spot:</p>
              <p>{spot.name}</p>
              <p>{spot.streetAddress}</p>
            </>
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
              autoFocus={true}
            />
          </div>
          <div className="input-div">
            <label>Body</label>
            <textarea
              className='input'
              type='text'
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={8}
              required
            />
          </div>
          <div className="input-div">
            <label>Rating</label>
            <Rating userChangeable={true} id={"rating" + nanoid()} />
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
