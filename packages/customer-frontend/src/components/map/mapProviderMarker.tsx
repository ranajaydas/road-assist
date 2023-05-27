import { useState } from 'react';
import { MarkerF, InfoWindowF } from '@react-google-maps/api';

import MapProviderInfoWindow from './mapProviderInfoWindow';
import towTruckImage from '../../assets/tow-truck-yellow.png';

const MapProviderMarker = (props: {
  providerLocation: google.maps.LatLngLiteral;
}): JSX.Element => {
  const [showInfoWindow, setShowInfoWindow] = useState(true);

  return (
    <MarkerF
      position={props.providerLocation}
      icon={{
        anchor: new google.maps.Point(25, 25),
        url: towTruckImage,
      }}
      onClick={() => setShowInfoWindow(true)}
    >
      {showInfoWindow && (
        <InfoWindowF
          position={props.providerLocation}
          onCloseClick={() => setShowInfoWindow(false)}
        >
          <MapProviderInfoWindow />
        </InfoWindowF>
      )}
    </MarkerF>
  );
};

export default MapProviderMarker;
