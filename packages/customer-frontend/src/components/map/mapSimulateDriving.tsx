/** This module is for testing purposes only
 * It simulates the provider's driving to pick the customer up
 * TODO - delete this once testing is completed
 */

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import styled from '@emotion/styled';
import { Fab, Tooltip } from '@mui/material';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

import { IncidentDetails } from '@roadside-assist/shared';
import {
  incidentDetailsAtom,
  userLocationCoordsAtom,
} from '../../state/incidents';
import { snackbarAtom } from '../../state/snackbar';
import defaults from '../../../defaults';

const StyledFab = styled(Fab)({
  position: 'absolute',
  top: 60,
  right: 10,
});

const simulateDrivingURL = defaults.apiURL + '/incident/simulate-driving';
const providerArrivedURL = defaults.apiURL + '/incident/provider-arrived';
const sleep = (waitTimeInMs: number) =>
  new Promise((resolve) => setTimeout(resolve, waitTimeInMs));

const MapSimulateDriving = (props: {
  directions: google.maps.DirectionsResult | undefined;
}): JSX.Element => {
  const [clicked, setClicked] = useState(false);
  const [userLocationCoords] = useAtom(userLocationCoordsAtom);
  const [incidentDetails] = useAtom(incidentDetailsAtom);
  const [, setSnackbarData] = useAtom(snackbarAtom);

  const directionsData = props.directions?.routes[0].legs[0];

  const handleClick = async () => {
    if (!directionsData) return;
    setClicked(true);

    // Extract lat and lng from directionsData
    const { steps } = directionsData;
    let loopComplete = false;
    for (let i = 0; i < steps.length; i++) {
      const incidentStatus = localStorage.getItem('incidentStatusAtom');
      if (incidentStatus === '"notCreated"') break;

      simulateDriving.mutate({
        lat: steps[i].start_location.lat(),
        lng: steps[i].start_location.lng(),
      });

      // Add an artificial delay to simulate driving
      await sleep(5000);
      if (i === steps.length - 1) loopComplete = true;
    }
    if (userLocationCoords && loopComplete) {
      simulateDriving.mutate(userLocationCoords);
      providerArrived.mutate(incidentDetails);
    }
  };

  // Simulate Driving to a location
  const simulateDriving = useMutation({
    mutationFn: async (providerLocation: { lat: number; lng: number }) => {
      await fetch(simulateDrivingURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(providerLocation),
      });
    },
    onError: () => {
      setSnackbarData({ message: 'Could not simulate driving' });
      setClicked(false);
    },
  });

  // Simulate provider arrived
  const providerArrived = useMutation({
    mutationFn: async (incidentDetails: IncidentDetails) => {
      const res = await fetch(providerArrivedURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(incidentDetails),
      });
      await res.json();
    },
  });

  return (
    <Tooltip title="Simulate Driving">
      <StyledFab
        size="small"
        color="secondary"
        disabled={clicked}
        onClick={handleClick}
      >
        <VideogameAssetIcon />
      </StyledFab>
    </Tooltip>
  );
};

export default MapSimulateDriving;
