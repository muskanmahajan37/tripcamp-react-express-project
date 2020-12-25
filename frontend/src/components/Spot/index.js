// frontend/src/components/Spot/index.js

import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPlayer from 'react-player/youtube'


// import { Redirect, useHistory } from 'react-router-dom';

// import * as spotActions from '../../store/spot';

import '../Forms.css';
import './Spot.css';

export default function Spot() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots);
  console.log("SPOT.js SPOTSSS", spots);
  // , height: 400*9/16
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
                <img key={url} src={url} alt={spot.name} className='media-display'/>
            )}
          </div>
        </div>
      )}
    </div>
  );
}