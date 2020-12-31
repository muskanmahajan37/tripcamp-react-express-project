import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'

import { AllSpots } from '../Spot';
import Banner from './Banner';
import MainSearchBar from '../Search';

import './Home.css';

export default function Home() {
  const location = useLocation();
  let reduxCurrentSpot = useSelector(state => state.spots.currentSpot);  
  if(location.pathname === "/") reduxCurrentSpot = null;

  return (
    reduxCurrentSpot ? <></> : <div className="main-home-view">
      <div className='banner-and-search-div'>
        <MainSearchBar />
        <Banner />
      </div>
      <div className="main-home-view-spots" >
        <AllSpots searchTerm={""} />
      </div>
    </div>
  );
}