import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import styled from '@emotion/styled';
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  Zoom,
} from '@mui/material';
import ConfettiExplosion from 'react-confetti-explosion';

import { incidentStatusAtom, providerDetailsAtom } from '../../state/incidents';

const StyledContent = styled(DialogContent)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '& h3': {
    marginBottom: '0.25rem',
  },
});

const StyledAvatar = styled(Avatar)({
  width: '4rem',
  height: '4rem',
  marginBottom: '1rem',
});

const MapProviderArrivedDialog = (): JSX.Element => {
  const [openDialog, setOpenDialog] = useState(false);
  const [incidentStatus] = useAtom(incidentStatusAtom);
  const [providerDetails] = useAtom(providerDetailsAtom);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if (incidentStatus === 'providerArrived') {
      handleOpenDialog();
    }
  }, [incidentStatus]);

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Zoom}
      hideBackdrop
    >
      <StyledContent>
        {openDialog && <ConfettiExplosion />}

        <StyledAvatar src={providerDetails?.pictureURL} alt="Provider">
          {!providerDetails?.pictureURL && providerDetails?.name[0]}
        </StyledAvatar>
        <Typography variant="h3">
          {providerDetails?.name} ({providerDetails?.regNo})
        </Typography>
        <Typography variant="h4">from {providerDetails?.company}</Typography>
        <Typography variant="h4">has arrived!</Typography>
      </StyledContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MapProviderArrivedDialog;
