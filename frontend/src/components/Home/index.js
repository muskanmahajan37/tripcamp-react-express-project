import MapComponent, { MapWithMarkerClusterer } from '../GoogleMaps';

import Spot, { AllSpots } from '../Spot';
import UploadForm from '../UploadForm';


export default function Home() {
  return (
    <div className="main-home-view" >
      {/* <MapComponent /> */}
      {/* <MapWithMarkerClusterer /> */}
      {/* <Spot /> */}
      {/* <AllSpots /> */}
      <UploadForm />
    </div>
  );
}