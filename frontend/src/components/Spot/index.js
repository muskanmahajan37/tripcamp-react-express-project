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

import * as spotActions from '../../store/spot';

import '../Forms.css';
import './Spot.css';

export function AllSpots({ searchTerm = null }) {
  const reduxSpots = useSelector(state => state.spots);
  const searchTerms = useSelector(state => state.searchs);
  const history = useHistory();
  const [showReviewForm, setShowReviewForm] = useState(false);
  let spots;

  // useEffect(() => {
    if (searchTerms.length && searchTerms[searchTerms.length - 1]) {
      console.log('searchTerms[searchTerms.length - 1].text', searchTerms[searchTerms.length - 1].text);
      spots = reduxSpots.filter(spot => {
        return spot.name.toLowerCase().includes(searchTerms[searchTerms.length - 1].text);
      })
      console.log('spots after filtered', spots, "reduxSpots", reduxSpots);
    } else {
      spots = reduxSpots;
    }
  // }, [searchTerms]);

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
              {spot.urls && spot.urls[0] && !spot.urls[0].toLowerCase().includes("youtu") ?
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
      </div>
      <div className='home-side-map'>
        {
          spots && spots.length &&  <MapWithMarkerClusterer
            center={{ lat: spots[0].gpsLocation[0], lng: spots[0].gpsLocation[1] }}
            zoom={5}
            spots={spots} />
        }
      </div>
    </div>
  );
}

export function SpotFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  // const spots = useSelector(state => state.spots);
  const media = useSelector(state => state.media);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [errors, setErrors] = useState([]);
  const spotModalRef = useRef(undefined);
  const history = useHistory();

  useEffect(() => {
    console.log("35 media", media);
  }, [media])

  if (!sessionUser) {
    if (spotModalRef.current)
      spotModalRef.current.style.display = "none";
    console.log('spot', history);
    return <Redirect to='/login' />;
  }


  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);

    console.log("handleSubmit media", media, " id", media && media[media.length - 1].id);

    return dispatch(spotActions.createOneSpot({
      spot: {
        userId: sessionUser.id,
        name,
        description,
        units,
        gpsLocation: [latitude, longitude],
        mediaUrlIds: [media[media.length - 1].id],
        streetAddress,
        city,
        stateProvice,
        zipCode,
        country,
        perNightRate,
        accommodationType,
        website
      }
    }))
      .then(res => {
        if (spotModalRef.current)
          spotModalRef.current.style.display = "none";
        history.push('/');
      })
      .catch(res => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
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
    <div className="modal" ref={spotModalRef}
    // onClick={e => { e.preventDefault(); if (showUploadForm) setShowUploadForm(false) }}
    >
      <form
        className='form-container modal-content-spot-creation'
        onSubmit={handleSubmit}
      >
        <h3>Create Your Spot</h3>

        <ul className='error-messages'>
          {errors.map((error, index) => <li key={nanoid()}>{error}</li>)}
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
              value={description}
              onChange={e => setDescription(e.target.value)}
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
                step={1e-14}
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
                step={1e-14}
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
              rows={3}
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
          <div className="input-div">
            <button
              className='button button-small button-Send'
              onClick={e => { e.preventDefault(); setShowUploadForm(!showUploadForm) }}
            >Upload Pic/Vid</button>
            {
              showUploadForm && <UploadForm
                link="official/spots"
                divClass="side-modal"
                redirectHome={false}
                displayed="block"
              />
            }
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