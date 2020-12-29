// frontend/src/components/Spot/index.js

import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { nanoid } from 'nanoid';
// import ReactPlayer from 'react-player/youtube'

import { MapWithMarkerClusterer } from '../GoogleMaps';
import Rating from '../Rating';
import BookingFormModal from '../BookingForm';
import UploadForm from '../UploadForm';

// import * as spotActions from '../../store/spot';

import '../Forms.css';
import './Spot.css';

export function AllSpots() {
  const spots = useSelector(state => state.spots);
  const history = useHistory();
  const [showReviewForm, setShowReviewForm] = useState(false);
  let locations = [];

  useEffect(() => {
    if (spots) {
      spots.map(spot => {
        locations.push({ lat: spot.gpsLocation[0], lng: spot.gpsLocation[1] });
      });
    }
  }, [spots.length]);

  function handleBookNowClick(e) {
    history.push(`/bookings/spots/${e.target.id.split('-')[0]}`);
    // return <BookingFormModal spot={spot}/>
  }
  function handleReviewClick(e) {
    setShowReviewForm(true)
    history.push(`/reviews/spots/${e.target.id.split('-')[0]}`);
  }

  return (
    <div className='spots-and-maps'>
      <div className="spots-home-display-grid">
        {spots && spots.map(spot =>
          <div key={nanoid()} >
            <h6>{spot.name}</h6>
            <div className='spot-media-display'>
              {spot.urls && !spot.urls[0].toLowerCase().includes("youtu") ?
                <img key={spot.urls[0]} src={spot.urls[0]} alt={spot.name} className='spot-default-image' />
                :
                <></>
              }
              <div className="start-rating-on-top-of-image">
                <Rating rated={3 + (Math.random() * 2)} />
              </div>
            </div>
            <div style={{ marginTop: '10px' }}>
              <div className="buttons-and-address">
                <div className="book-and-more-div">
                  <button onClick={handleBookNowClick} id={spot.id + "-" + nanoid()}>Book Now</button>
                  <button onClick={handleReviewClick} id={spot.id + "-" + nanoid()}>Review</button>
                </div>
                <div className='spot-address'>
                  <p >
                    {spot.streetAddress}
                  </p>
                  <p >
                    {spot.city} {spot.stateProvice} {spot.zipCode} {spot.country}
                  </p>
                </div>
              </div>
              <p className='spot-description hide-scollbar'>
                {spot.description}
              </p>
            </div>
          </div>
        )}
        {spots && spots.map(spot =>
          <div key={nanoid()} >
            <h6>{spot.name}</h6>
            <div className='spot-media-display'>
              {spot.urls && !spot.urls[0].toLowerCase().includes("youtu") ?
                <img key={spot.urls[0]} src={spot.urls[0]} alt={spot.name} className='spot-default-image' />
                :
                <></>
              }
            </div>
            <div style={{ marginTop: '10px' }}>
              <p className='spot-address'>
                {spot.streetAddress}
              </p>
              <p className='spot-address'>
                {spot.city} {spot.stateProvice} {spot.zipCode} {spot.country}
              </p>
              <p className='spot-description hide-scollbar'>
                {spot.description}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className='home-side-map'>
        {
          locations && <MapWithMarkerClusterer center={locations[0]} zoom={5} locations={locations} />
        }
      </div>
    </div>
  );
}

export function SpotFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const spots = useSelector(state => state.spots);
  const [name, setName] = useState("");
  const [discription, setDiscription] = useState("");
  const [units, setUnits] = useState(1);
  const [latitude, setLatitude] = useState(undefined);
  const [longitude, setLongitude] = useState(undefined);
  const [fullAddress, setFullAddress] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateProvice, setStateProvince] = useState("");
  const [zipCode, setZipcode] = useState(undefined);
  const [country, setCountry] = useState("");
  const [perNightRate, setPerNightRate] = useState(undefined);
  const [accommodationType, setAccommodationType] = useState(undefined);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState([]);
  const spotModalRef = useRef(undefined);
  const history = useHistory();

  if (!sessionUser) {
    if (spotModalRef.current)
      spotModalRef.current.style.display = "none";
    console.log('spot', history);
    return <Redirect to='/login' />;
  }


  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);

    // return dispatch(spotActions.createOneBooking({
    //   spot: {
    //     userId: sessionUser.id,
    //     spotId: spot.id,
    //     name,
    //     discription,
    //     guests: units,
    //     gpsLocation
    //   }
    // }))
    //   .then(res => {
    //     if (spotModalRef.current)
    //       spotModalRef.current.style.display = "none";
    //     history.push('/');
    //   })
    //   .catch(res => {
    //     if (res.data && res.data.errors) setErrors(res.data.errors);
    //   });
  };

  const handleCancelClick = e => {
    e.preventDefault();
    if (spotModalRef.current)
      spotModalRef.current.style.display = "none";
    history.push('/');
  }

  const parseAddress = (textValue) => {
    const values = textValue.split(',')
    setStreetAddress(values[0]);
    setCity(values[1]);
    setStateProvince(values[2]);
    setZipcode(values[3]);
    setCountry(values[4]);
    console.log(streetAddress, city, stateProvice, zipCode, country);
  };

  return (
    <div className="modal" ref={spotModalRef}>
      <form
        className='form-container modal-content'
        onSubmit={handleSubmit}
      >
        <h3>Create Your Spot</h3>

        <ul className='error-messages'>
          {errors.map((error, index) => <li key={index}>{error}</li>)}
        </ul>
        <div className="inputs-div">
          <div className="input-div">
            <label>Spot Name</label>
            <input
              className='input'
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              required
              autoFocus={true}
            />
          </div>
          <div className="input-div">
            <label>Description</label>
            <textarea
              className='input'
              type='text'
              value={discription}
              onChange={e => setDiscription(e.target.value)}
              rows={10}
              required
            />
          </div>
          <div className="input-div">
            <label>Number of Units</label>
            <input
              className='input-number'
              type='number'
              value={units}
              min={1}
              onChange={e => setUnits(e.target.value)}
              required
            />
          </div>
          <div className="input-div-number">
            <label>GPS Location (Lat, Long)</label>
            <div className="input-div" style={{ paddingTop: '0px', paddingLeft: '5px' }}>
              <input
                className='input'
                type='number'
                min={-90}
                max={90}
                value={latitude}
                onChange={e => {
                  if (e.target.value < -90) e.target.value = -90;
                  if (e.target.value > 90) e.target.value = 90;
                  setLatitude(e.target.value)
                }}
                required
              />
              <input
                className='input'
                type='number'
                min={-180}
                max={180}
                value={longitude}
                onChange={e => {
                  if (e.target.value < -180) e.target.value = -180;
                  if (e.target.value > 180) e.target.value = 180;
                  setLongitude(e.target.value)
                }}
                required
              />
            </div>
          </div>
          <div className="input-div">
            <label>Address (Street, City, State/Province, Zip Code, Country)</label>
            <textarea
              className='input'
              type='text'
              value={fullAddress}
              onChange={e => { setFullAddress(e.target.value); parseAddress(e.target.value) }}
              required
              placeholder="Street address first line,&#10;City, State/Provice, Zipcode&#10;Country"
            />
          </div>
          <div className="input-div">
            <label>Rate Per Night ($USD)</label>
            <input
              className='input-number'
              type='number'
              value={perNightRate}
              min={0}
              onChange={e => setPerNightRate(e.target.value)}
            />
          </div>
          <div className="input-div">
            <label>Accommodation Type</label>
            <input
              className='input-number'
              type='number'
              value={accommodationType}
              min={0}
              onChange={e => setAccommodationType(e.target.value)}
            />
          </div>
          <div className="input-div">
            <label>External Website</label>
            <input
              className='input'
              type='text'
              value={website}
              min={0}
              onChange={e => setWebsite(e.target.value)}
            />
          </div>
          <UploadForm />
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

export default function Spot() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots);
  return (
    <div>
      {spots && spots.map(spot =>
        <div key={spot.name}>
          <h3>{spot.name}</h3>
          <div className='spot-media-display'>
            {spot.urls && spot.urls.map(url =>
              url.toLowerCase().includes("youtu") ?
                // <ReactPlayer
                //   url={url}
                //   width='400px'
                //   height='225px'
                //   controls={true}
                //   key={url}
                // />
                <></>
                :
                <img key={url} src={url} alt={spot.name} className='media-display' />
            )}
          </div>
        </div>
      )}
    </div>
  );
}