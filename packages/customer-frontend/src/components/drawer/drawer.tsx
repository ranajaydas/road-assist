import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { Paper, Slide, Typography } from '@mui/material';
import { useAtom } from 'jotai';

import { IncidentStatus } from '@roadside-assist/shared';
import { incidentStatusAtom } from '../../state/incidents';
import ProviderCard from './providerCard';

const StyledBox = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  minHeight: '7rem',
  opacity: 0.9,
});

const StyledPaper = styled(Paper)({
  minHeight: '7rem',
});

const StyledTitle = styled(Typography)({
  padding: '1rem',
});

const getTitle = (incidentStatus: IncidentStatus): string | JSX.Element => {
  switch (incidentStatus) {
    case 'created':
      return 'We are looking for a provider now...';
      break;
    case 'providerSent':
    case 'providerArrived':
      return <ProviderCard />;
      break;
    case 'providerCancelled':
      return 'The provider cancelled the incident. We are searching for a new provider now...';
    default:
      return 'Unknown incident status';
  }
};

const Drawer = (): JSX.Element => {
  const [incidentStatus] = useAtom(incidentStatusAtom);

  return (
    <Slide
      in={!(incidentStatus === 'notCreated' || incidentStatus === 'submitting')}
      direction="up"
      mountOnEnter
      unmountOnExit
    >
      <StyledBox>
        <StyledPaper elevation={3}>
          <StyledTitle variant="h4">{getTitle(incidentStatus)}</StyledTitle>
        </StyledPaper>
      </StyledBox>
    </Slide>
  );
};

export default Drawer;
