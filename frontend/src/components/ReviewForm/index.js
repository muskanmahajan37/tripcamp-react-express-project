// frontend/src/components/ReviewForm/index.js

import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';

import * as sessionActions from '../../store/session';
import * as reviewActions from '../../store/review';

import Rating from '../Rating';

import '../Forms.css';
import { nanoid } from 'nanoid';

export default function ReviewFormModal({divClass = "modal", formContentClass = 'form-container modal-content'}) {
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
  const [trialRating, setTrialRating] = useState(null);
  const [rating, setRating] = useState(null);

  // useEffect(() => {
  //   setRating(ratings[ratings.length - 1]);
  //   console.log('useEffect', rating);
  // }, [ratings[ratings.length - 1]]);

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

    // console.log('ratings', ratings);
    // setRating(ratings[ratings.length-1]);    
    if (!rating)
      return setErrors(["Select a rating"]);

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

  // const handleFormClick = e => {
  //   if (e.target.id[1] === '-')
  //     setRating(ratings[ratings.length - 1])
  //   console.log('handleFormClick ratings', ratings);
  // };

  let arrayOf5 = new Array(5).fill(1);

  function onMouseOver(e) {
    const id = e.target.id.split("-")[0];
    setTrialRating(Number(id));
  }
  function onMouseLeave() {
    setTrialRating(rating);
  }
  function onStarClicked(e) {
    const ratingNumber = Number(e.target.id.split("-")[0]);
    setRating(ratingNumber);
    setTrialRating(ratingNumber)
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
            <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
              <span id={0 + "-" + nanoid()} onClick={onStarClicked} className="far fa-star star-set-font-size" style={{ color: "rgba(0,0,0,0)" }}> </span>
              {arrayOf5.map((el, i) => <span
                className={i < trialRating ? "fa fa-star checked star-set-font-size" : "far fa-star star-set-font-size"}
                key={nanoid()}
                id={(i + 1) + "-" + nanoid()}
                onClick={onStarClicked}
              />
              )}
              <span className="far fa-star star-set-font-size" style={{ color: "rgba(0,0,0,0)" }}>{ }</span>
            </div>
            {/* <Rating userChangeable={true} id={"rating" + nanoid()} /> */}
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
