import MapComponent, { MapWithMarkerClusterer } from '../GoogleMaps';


export default function Home() {
  return (
    <div className="main-home-view" >
      {/* <MapComponent /> */}
      <MapWithMarkerClusterer />
    </div>
  );
}