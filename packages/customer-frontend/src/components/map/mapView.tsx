import { useMemo } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import styled from '@emotion/styled';
import { useAtom } from 'jotai';

import { LocationCoords, IncidentStatus } from '@roadside-assist/shared';
import { incidentStatusAtom } from '../../state/incidents';
import defaults from '../../../defaults';
import MapDirections from './mapDirections';
import MapCancelOrCompleteButton from './mapCancelOrCompleteButton';
import MapUserMarker from './mapUserMarker';
import MapProviderMarker from './mapProviderMarker';
import MapProviderArrivedDialog from './mapProviderArrivedDialog';
import MapAutoComplete from './mapAutoComplete';

const StyledContainer = styled('div')({
  display: 'flex',
  height: `calc(100% - ${defaults.navBarHeight})`,
});

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const options: google.maps.MapOptions = {
  disableDefaultUI: true,
  clickableIcons: false,
};

const getAnimation = (
  incidentStatus: IncidentStatus
): google.maps.Animation | undefined => {
  if (incidentStatus === 'submitting' || incidentStatus === 'created')
    return google.maps.Animation.BOUNCE;
  return google.maps.Animation.DROP;
};

const MapView = (props: {
  userLocation: LocationCoords | undefined;
  providerLocation: LocationCoords | undefined;
}): JSX.Element => {
  const [incidentStatus] = useAtom(incidentStatusAtom);
  const mapCenter = useMemo(
    () => ({
      lat: defaults.initialUserLatitude,
      lng: defaults.intialUserLongitude,
    }),
    []
  );

  return (
    <StyledContainer>
      <GoogleMap
        zoom={props.userLocation ? 15 : 10}
        center={mapCenter}
        mapContainerStyle={mapContainerStyle}
        options={options}
      >
        <MapCancelOrCompleteButton />
        <MapProviderArrivedDialog />
        {incidentStatus === 'notCreated' && <MapAutoComplete />}

        {props.userLocation && (
          <MapUserMarker
            position={props.userLocation}
            animation={getAnimation(incidentStatus)}
          />
        )}
        {props.userLocation &&
          props.providerLocation &&
          (incidentStatus === 'providerSent' ||
            incidentStatus === 'providerArrived') && (
            <>
              <MapProviderMarker providerLocation={props.providerLocation} />
              <MapDirections
                userLocation={props.userLocation}
                providerLocation={props.providerLocation}
              />
            </>
          )}
      </GoogleMap>
    </StyledContainer>
  );
};

export default MapView;
