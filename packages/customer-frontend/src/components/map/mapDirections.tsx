import { useEffect } from 'react';
import { DirectionsRenderer } from '@react-google-maps/api';
import { useAtom } from 'jotai';

import { LocationCoords } from '@roadside-assist/shared';
import { theme } from '../../theme';
import {
  directionsAtom,
  directionsRenderedOnceAtom,
} from '../../state/incidents';

// TODO: Delete after testing. For testing purposes only
import MapSimulateDriving from './mapSimulateDriving';

const MapDirections = (props: {
  userLocation: LocationCoords;
  providerLocation: LocationCoords;
}): JSX.Element => {
  const [directions, setDirections] = useAtom(directionsAtom);
  const [directionsRenderedOnce, setDirectionsRenderedOnce] = useAtom(
    directionsRenderedOnceAtom
  );

  const fetchDirections = (
    origin: LocationCoords,
    destination: LocationCoords
  ) => {
    if (!origin || !destination) return;
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          console.log('Setting directions to', result);
          setDirections(result);
        }
      }
    );
  };

  useEffect(() => {
    fetchDirections(props.providerLocation, props.userLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.providerLocation, props.userLocation]);

  return (
    <>
      {/* For testing purposes only */}
      <MapSimulateDriving directions={directions} />

      <DirectionsRenderer
        directions={directions}
        onDirectionsChanged={() =>
          !directionsRenderedOnce &&
          setTimeout(() => setDirectionsRenderedOnce(true), 1000)
        }
        options={{
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: theme.palette.primary.main,
            strokeWeight: 5,
          },
          preserveViewport: directionsRenderedOnce,
        }}
      />
    </>
  );
};

export default MapDirections;
