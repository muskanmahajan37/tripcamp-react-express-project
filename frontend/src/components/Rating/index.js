import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

import { setRatingPOJO } from '../../store/rating';

import './Rating.css';

export default function Rating({ rated = 0, userChangeable = false, numberOfReviews = undefined }) {
  const [trialRating, setTrialRating] = useState(rated);
  const [rating, setRating] = useState(rated);
  let arrayOf5 = new Array(5).fill(1);
  const dispatch = useDispatch();

  if (!userChangeable) {
    const ratatedWholeNumber = Math.floor(rated);
    const ratedDecimal = rated - ratatedWholeNumber;
    return (
      <div>
        {
          arrayOf5.map((el, i) => <span
            className={i < ratatedWholeNumber ?
              "fa fa-star checked star-set-font-size"
              : (ratedDecimal > 0 && i < ratatedWholeNumber + 1 ? "fas fa-star-half-alt star-set-font-size checked" : "far fa-star star-set-font-size")
            }
            key={nanoid()}
            id={(i + 1) + "-" + nanoid()}
            onClick={onStarClicked}
          />
          )
        }
        <span className="star-set-font-size">
          {typeof (rated) === 'number' && rated > 0 ? rated.toFixed(1) : <></>}
          {(numberOfReviews !== undefined) && <span>
            {` - ${numberOfReviews}`}
            {numberOfReviews > 1 ? " Reviews" : " Review"}
          </span>}
        </span>
      </div>
    );
  }

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
    dispatch(setRatingPOJO(ratingNumber));
  }

  return (
    <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      <span id={0 + "-" + nanoid()} onClick={onStarClicked} className="far fa-star star-set-font-size" style={{ color: "rgba(0,0,0,0)" }}> </span>
      { arrayOf5.map((el, i) => <span
        className={i < trialRating ? "fa fa-star checked star-set-font-size" : "far fa-star star-set-font-size"}
        key={nanoid()}
        id={(i + 1) + "-" + nanoid()}
        onClick={onStarClicked}
      />
      )}
      <span className="far fa-star star-set-font-size" style={{ color: "rgba(0,0,0,0)" }}>{ }</span>
    </div>
  );
}