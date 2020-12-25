// frontend/src/components/Spot/index.js

import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Redirect, useHistory } from 'react-router-dom';
// import ReactPlayer from 'react-player/youtube'

import { MapWithMarkerClusterer } from '../GoogleMaps';

// import * as spotActions from '../../store/spot';

import '../Forms.css';
import './Spot.css';

export function AllSpots() {
  const spots = useSelector(state => state.spots);
  let locations = [];

  useEffect(() => {
    if(spots){
      spots.map(spot => {
        locations.push({lat: spot.gpsLocation[0], lng: spot.gpsLocation[1]});
      });
      console.log("locationsfdfsdfsdfsdfsdfs", locations);
    }
  },[spots.length]);

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
            </div>
            <div>
              <p className='spot-description'>
                {spot.description}
              </p>
            </div>
          </div>
        )}
      </div>
      {
        locations.length && <MapWithMarkerClusterer center={locations[0]} zoom={5} locations={locations}/>
      }
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