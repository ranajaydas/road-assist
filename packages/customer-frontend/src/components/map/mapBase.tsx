import { Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { useLoadScript } from '@react-google-maps/api';
import { useMutation } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { LocationCoords, CustomerIncident } from '@roadside-assist/shared';
import defaults from '../../../defaults';
import {
  userLocationCoordsAtom,
  providerLocationCoordsAtom,
  incidentDetailsAtom,
  incidentStatusAtom,
} from '../../state/incidents';
import { snackbarAtom } from '../../state/snackbar';
import { useGeolocation } from '../../hooks/useGeolocation';
import MapView from './mapView';
import Drawer from '../drawer/drawer';

const StyledFloatingContainer = styled('div')({
  position: 'absolute',
  left: 0,
  bottom: 0,
  padding: '0 2rem 2rem 2rem',
  width: '100%',
});

const StyledButton = styled(Button)({
  width: '100%',
});

type LibraryProps = (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'
)[];

const incidentCreateURL = defaults.apiURL + '/incident/create';
const googleMapsApiKey = defaults.googleMapsAPIKey;
const libraries: LibraryProps = ['places'];

const MapBase = (): JSX.Element => {
  const [userLocationCoords] = useAtom(userLocationCoordsAtom);
  const [providerLocationCoords] = useAtom(providerLocationCoordsAtom);
  const [incidentDetails] = useAtom(incidentDetailsAtom);
  const [incidentStatus, setIncidentStatus] = useAtom(incidentStatusAtom);
  const [, setSnackbarData] = useAtom(snackbarAtom);

  // Get the user's location
  useGeolocation();

  // Load the Google Maps API
  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
    libraries,
  });

  // Create a new incident
  const newIncident = useMutation({
    mutationFn: async (location: LocationCoords | undefined) => {
      const incident: CustomerIncident = location
        ? { ...incidentDetails, ...location }
        : incidentDetails;
      const res = await fetch(incidentCreateURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(incident),
      });
      const response = await res.json();
      console.log('Response from backend:', response);
    },
    onError: () => {
      setIncidentStatus('notCreated');
      setSnackbarData({
        message: 'An error occurred while creating the incident',
      });
    },
  });

  // Handle form submission
  const handleSubmit = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    setIncidentStatus('submitting');
    newIncident.mutate(userLocationCoords);
  };

  // Redirect the user to the home page if they haven't filled out the form
  if (!incidentDetails || incidentDetails.regNo === '') {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      {(isLoaded && (
        <MapView
          userLocation={userLocationCoords}
          providerLocation={providerLocationCoords}
        />
      )) || <div>Loading...</div>}
      <StyledFloatingContainer>
        {(incidentStatus === 'notCreated' || incidentStatus === 'submitting') &&
          userLocationCoords && (
            <StyledButton
              onClick={handleSubmit}
              endIcon={<SendIcon />}
              disabled={incidentStatus === 'submitting'}
              variant="contained"
            >
              Send Request
            </StyledButton>
          )}
      </StyledFloatingContainer>
      <Drawer />
    </>
  );
};

export default MapBase;
