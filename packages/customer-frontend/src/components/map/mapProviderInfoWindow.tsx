import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import { useAtom } from 'jotai';

import { timeToArrivalAtom, incidentStatusAtom } from '../../state/incidents';

const StyledDiv = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const MapProviderInfoWindow = (): JSX.Element => {
  const [timeToArrival] = useAtom(timeToArrivalAtom);
  const [incidentStatus] = useAtom(incidentStatusAtom);

  let timeInMinsValue = 1;
  let timeUnits = 'min';
  if (timeToArrival && timeToArrival.value > 60) {
    timeInMinsValue = Math.round(timeToArrival.value / 60);
    timeUnits = 'mins';
  }

  return (
    <StyledDiv>
      {(incidentStatus !== 'providerArrived' && (
        <>
          {' '}
          <Typography variant="h2" mr={0.5}>
            {timeInMinsValue}
          </Typography>
          <div>
            <Typography variant="h6">
              {timeUnits}
              <br />
              away
            </Typography>
          </div>
        </>
      )) || <Typography variant="h6">Provider arrived!</Typography>}
    </StyledDiv>
  );
};

export default MapProviderInfoWindow;
