import MapComponent, { MapWithMarkerClusterer } from '../GoogleMaps';


export default function Home() {
  return (
    <div className="mainbody" >
      {/* <MapComponent /> */}
      <MapWithMarkerClusterer />
    </div>
  );
}