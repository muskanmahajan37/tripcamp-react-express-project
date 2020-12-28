// frontend/src/components/Spot/index.js

import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { nanoid } from 'nanoid';
// import ReactPlayer from 'react-player/youtube'

import { MapWithMarkerClusterer } from '../GoogleMaps';
import Rating from '../Rating';
import BookingFormModal from '../BookingForm';

// import * as spotActions from '../../store/spot';

import '../Forms.css';
import './Spot.css';

export function AllSpots() {
  const spots = useSelector(state => state.spots);
  const history = useHistory();
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
  function handleMoreClick(e) {
    alert("Sorry, this function is still being worked on. Please check back later. Thanks!");
  }

  return (
    <div className='spots-and-maps'>
      <div className="spots-home-display-grid">
        {spots && spots.map(spot =>
          <div key={spot.name} >
            <h6>{spot.name}</h6>
            <div className='spot-media-display'>
              {spot.urls && !spot.urls[0].toLowerCase().includes("youtu") ?
                <img key={spot.urls[0]} src={spot.urls[0]} alt={spot.name} className='spot-default-image' />
                :
                <></>
              }
              <div className="start-rating-on-top-of-image">
                <Rating rated={2.8} userChangeable={true} />
              </div>
            </div>
            <div style={{ marginTop: '10px' }}>
              <div className="buttons-and-address">
                <div className="book-and-more-div">
                  <button onClick={handleBookNowClick} id={spot.id + "-" + nanoid()}>Book Now</button>
                  <button onClick={handleMoreClick}>More</button>
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
          <div key={spot.name} >
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