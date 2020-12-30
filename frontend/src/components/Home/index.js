import MapComponent, { MapWithMarkerClusterer } from '../GoogleMaps';
import { Link } from 'react-router-dom';

import Spot, { AllSpots } from '../Spot';
import UploadForm from '../UploadForm';
import Banner from './Banner';
import MainSearchBar from '../Search';

import './Home.css';

export default function Home() {
  return (
    <div className="main-home-view">
      <div className='banner-and-search-div'>
        <Banner />
        <MainSearchBar />
      </div>
      <div className="main-home-view-spots" >
        <AllSpots searchTerm={""}/>
      </div>
    </div>
  );
}