
// frontend/src/components/Spot/index.js

import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPlayer from 'react-player/lazy'

// import { Redirect, useHistory } from 'react-router-dom';

// import * as spotActions from '../../store/spot';

import '../Forms.css';

export default function Spot() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots);
  // const [credential, setCredential] = useState('');
  // const [password, setPassword] = useState('');
  // const [errors, setErrors] = useState([]);
  // const [showForm, setShowForm] = useState(false);
  // const loginModalRef = useRef(null);
  // const history = useHistory();

  // 
  // useEffect(() => {
  //   dispatch(spotActions.getOneSpot(3))
  //     .then(res => {
  //       console.log("Spotssssss #3", spots);
  //       image = <img src={spots.urls[0]} alt="ta xua"/>
  //     })
  //     .catch(res => {
  //       console.log("spot error", res);
  //     });
  // }, [dispatch]);
  console.log("/SPOT spots", spots);

  return (
    <div>
      <h3>Spots</h3>
      {spots && spots[0] && spots[0].urls && spots[0].urls.map(url =>
        url.toLowerCase().includes("youtu") ?
          <ReactPlayer url={url} width="400"/>
          :
          <img key={url} src={url} alt="Ta xua" width="400"/>
      )}
    </div>
  );
}