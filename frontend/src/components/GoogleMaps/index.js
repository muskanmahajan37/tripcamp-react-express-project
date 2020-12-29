import React, { useState } from 'react'
import { GoogleMap, LoadScript, Marker, MarkerClusterer, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '1000px',
};
//38.4835° N, 78.8497° W
const defaultCenter = {
  lat: 38.513962313966964,
  lng: -78.4352627132812
};

const position = defaultCenter;

const defaultLocations = [
  { lat: 38.6159712, lng: -78.4503689 },
  { lat: 38.399970959, lng: -78.4956875 },
  { lat: 38.22864641, lng: -78.71404078 },
  { lat: 38.24914045, lng: -78.575338394 },
  { lat: 38.58806741, lng: -78.34050563 },
]

const options = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
}

function createKey(location) {
  return location.lat + location.lng
}

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function MapComponent({ center = defaultCenter, zoom = 10 }) {
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const onMarkerLoad = marker => {
    console.log('marker: ', marker)
  }

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAkH92G4PO4QrcdQ1GjsX5ThHe7tWNyQog"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */}
        <Marker
          onLoad={onMarkerLoad}
          position={position}
        />
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export const MapWithMarkerClusterer = ({
  center = defaultCenter,
  zoom = 7,
  locations = defaultLocations,
  spots = []
}) => {
  const [selected, setSelected] = useState({});
  console.log('spots', spots);

  const onSelect = spot => {
    setSelected({ spot });
  }
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAkH92G4PO4QrcdQ1GjsX5ThHe7tWNyQog"
    >
      <GoogleMap id='marker-example' mapContainerStyle={containerStyle} zoom={zoom} center={center}>
        <MarkerClusterer options={options}>
          {(clusterer) =>
            spots.map((spot, i) => (
              <Marker
                key={createKey(spot.gpsLocation)}
                position={{ lat: spot.gpsLocation[0], lng: spot.gpsLocation[1] }}
                clusterer={clusterer}
                label={labels[i % labels.length]}
                onClick={() => onSelect(spot)}
              />
            ))
          }
        </MarkerClusterer>
        {
          selected.spot &&
          (
            <InfoWindow
              position={{ lat: selected.spot.gpsLocation[0], lng: selected.spot.gpsLocation[1] }}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <div>
                <p>{selected.spot.name}</p>
                <p>{
                  selected.spot.streetAddress + " " +
                  selected.spot.city + " " +
                  selected.spot.stateProvince + " " +
                  selected.spot.zipCode
                }</p>
                {/* {Todo: add a picture} */}
              </div>
            </InfoWindow>
          )
        }
      </GoogleMap>
    </LoadScript>
  )
}

export default MapComponent;