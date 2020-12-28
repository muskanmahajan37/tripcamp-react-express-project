import MapComponent, { MapWithMarkerClusterer } from '../GoogleMaps';
import { Link } from 'react-router-dom';

import Spot, { AllSpots } from '../Spot';
import UploadForm from '../UploadForm';
import Banner from './Banner';


export default function Home() {
  return (
    <div className="main-home-view" >
      {/* <MapComponent /> */}
      {/* <MapWithMarkerClusterer /> */}
      {/* <Spot /> */}
      <Banner />
      <AllSpots />
      {/* <Link path='upload' > */}
        {/* <UploadForm link="official"/> */}
      {/* </Link> */}
    </div>
  );
}