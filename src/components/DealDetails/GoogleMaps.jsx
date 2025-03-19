import React from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import './GoogleMaps.css';

const GoogleMaps = ({ deal }) => {
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = deal.latitude && deal.longitude
    ? { lat: deal.latitude, lng: deal.longitude }
    : { lat: 40.7128, lng: -74.006 }; 

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <Map
        mapContainerStyle={mapContainerStyle} 
        defaultZoom={13}
        center={center}
        mapId={"brokered"}
      >
        {deal.latitude && deal.longitude && (
          <AdvancedMarker position={center} />
        )}
      </Map>
    </APIProvider>
  );
};

export default GoogleMaps;
