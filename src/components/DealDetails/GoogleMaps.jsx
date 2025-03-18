import React from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import './GoogleMaps.css'

const GoogleMaps = () => {
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Define the container style with width and height
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
      <Map
        mapContainerStyle={mapContainerStyle}  // Pass the container style here
        defaultZoom={13}
        defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
        onCameraChanged={(ev) =>
          console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
        }
      />
    </APIProvider>
  );
}

export default GoogleMaps;





