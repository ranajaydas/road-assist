import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import styled from '@emotion/styled';
import {
  Fab,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Typography,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { IncidentDetails } from '@roadside-assist/shared';
import {
  incidentsAtom,
  incidentDetailsAtom,
  incidentStatusAtom,
  userLocationTextAtom,
  userLocationCoordsAtom,
  providerLocationCoordsAtom,
  providerDetailsAtom,
  incidentsSocketConnectedAtom,
  directionsAtom,
  directionsRenderedOnceAtom,
} from '../../state/incidents';
import { snackbarAtom } from '../../state/snackbar';
import defaults from '../../../defaults';

const StyledFab = styled(Fab)({
  position: 'absolute',
  top: 10,
  right: 10,
});

const MapCancelOrCompleteButton = (): JSX.Element => {
  const [openDialog, setOpenDialog] = useState(false);
  const [cancelOrComplete, setCancelOrComplete] = useState<
    'cancel' | 'complete'
  >('cancel');
  const cancelOrCompleteRequestURL =
    defaults.apiURL + `/incident/user-${cancelOrComplete}`;
  const navigate = useNavigate();

  const [incidentStatus, setIncidentStatus] = useAtom(incidentStatusAtom);
  const [, setIncidents] = useAtom(incidentsAtom);
  const [incidentDetails, setIncidentDetails] = useAtom(incidentDetailsAtom);
  const [, setUserLocationtext] = useAtom(userLocationTextAtom);
  const [, setUserLocationCoords] = useAtom(userLocationCoordsAtom);
  const [, setProviderLocationCoords] = useAtom(providerLocationCoordsAtom);
  const [, setProviderDetails] = useAtom(providerDetailsAtom);
  const [, setIncidentsSocketConnected] = useAtom(incidentsSocketConnectedAtom);
  const [, setDirections] = useAtom(directionsAtom);
  const [, setDirectionsRenderedOnce] = useAtom(directionsRenderedOnceAtom);
  const [, setSnackbarData] = useAtom(snackbarAtom);

  useEffect(() => {
    if (incidentStatus === 'providerSent') {
      setCancelOrComplete('cancel');
    } else if (incidentStatus === 'providerArrived') {
      setCancelOrComplete('complete');
    }
  }, [incidentStatus]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Cancel or Complete the request
  const cancelOrCompleteRequest = useMutation({
    mutationFn: async (incidentDetails: IncidentDetails) => {
      const res = await fetch(cancelOrCompleteRequestURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(incidentDetails),
      });
      const response = await res.json();
      console.log('Response from backend:', response);
      if (response === false) throw new Error();
    },
  });

  const handleButtonPress = async () => {
    try {
      await cancelOrCompleteRequest.mutateAsync(incidentDetails);
      setIncidentStatus('notCreated');
      setIncidents(RESET);
      setIncidentDetails(RESET);
      setUserLocationtext(RESET);
      setUserLocationCoords(RESET);
      setProviderLocationCoords(RESET);
      setProviderDetails(RESET);
      setIncidentsSocketConnected(RESET);
      setDirections(RESET);
      setDirectionsRenderedOnce(RESET);
      setSnackbarData({ message: '' });
      navigate('/');
    } catch (err) {
      handleCloseDialog();
      setSnackbarData({ message: 'Failed to cancel incident' });
    }
  };

  return (
    <>
      <Tooltip
        title={
          cancelOrComplete === 'cancel' ? 'Cancel Request' : 'Complete Request'
        }
      >
        <div>
          {(incidentStatus === 'providerSent' ||
            incidentStatus === 'providerArrived') && (
            <StyledFab size="small" color="primary" onClick={handleOpenDialog}>
              {cancelOrComplete === 'cancel' ? (
                <CancelIcon />
              ) : (
                <CheckCircleIcon />
              )}
            </StyledFab>
          )}
        </div>
      </Tooltip>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h3" component="span" color="primary">
            {cancelOrComplete.toUpperCase() + ' REQUEST'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to {cancelOrComplete} this request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>No</Button>
          <Button onClick={handleButtonPress} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MapCancelOrCompleteButton;
