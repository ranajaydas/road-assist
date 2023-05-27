import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { MarkerF, InfoWindowF, useGoogleMap } from '@react-google-maps/api';
import { Typography } from '@mui/material';

import {
  incidentStatusAtom,
  userLocationCoordsAtom,
} from '../../state/incidents';

const MapUserMarker = (props: {
  position: google.maps.LatLngLiteral;
  animation?: google.maps.Animation;
}): JSX.Element => {
  const [showInfoWindow, setShowInfoWindow] = useState(true);
  const [incidentStatus] = useAtom(incidentStatusAtom);
  const [userLocationCoords, setUserLocationCoords] = useAtom(
    userLocationCoordsAtom
  );

  const map = useGoogleMap();

  const onDragStart = () => {
    setShowInfoWindow(false);
  };

  const onDragEnd = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setUserLocationCoords({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    }
  };

  useEffect(() => {
    if (map && userLocationCoords) {
      map.panTo(userLocationCoords);
    }
  }, [map, userLocationCoords]);

  return (
    <MarkerF
      position={props.position}
      animation={props.animation}
      draggable={incidentStatus === 'notCreated'}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {incidentStatus === 'notCreated' && showInfoWindow && (
        <InfoWindowF position={props.position}>
          <Typography variant="h6">
            You can drag
            <br />
            and drop me
          </Typography>
        </InfoWindowF>
      )}
    </MarkerF>
  );
};

export default MapUserMarker;
