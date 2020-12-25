import MapComponent, { MapWithMarkerClusterer } from '../GoogleMaps';

import Spot, { AllSpots } from '../Spot';


export default function Home() {
  return (
    <div className="main-home-view" >
      {/* <MapComponent /> */}
      {/* <MapWithMarkerClusterer /> */}
      {/* <Spot /> */}
      <AllSpots />
    </div>
  );
}