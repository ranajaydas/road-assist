import styled from '@emotion/styled';
import { Avatar, Link, Typography } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import PhoneIcon from '@mui/icons-material/Phone';
import { useAtom } from 'jotai';

import { incidentStatusAtom, providerDetailsAtom } from '../../state/incidents';

const ProviderRow = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

const ProviderProfile = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const ProviderContact = styled('div')({
  display: 'flex',
  alignItems: 'center',
  '& svg': {
    margin: '0 0.5rem',
  },
});

const StyledAvatar = styled(Avatar)({
  width: '4rem',
  height: '4rem',
  marginRight: '1rem',
});

const ProviderCard = (): JSX.Element => {
  const [providerDetails] = useAtom(providerDetailsAtom);
  const [incidentStatus] = useAtom(incidentStatusAtom);

  return (
    <ProviderRow>
      <ProviderProfile>
        <StyledAvatar src={providerDetails?.pictureURL} alt="Provider">
          {!providerDetails?.pictureURL && providerDetails?.name[0]}
        </StyledAvatar>
        <div>
          <Typography variant="h3">
            {providerDetails?.name} ({providerDetails?.regNo}){' '}
            {(incidentStatus === 'providerArrived' && 'has arrived!') ||
              'is enroute!'}
          </Typography>
          <Typography variant="h5">{providerDetails?.company}</Typography>
          <Typography variant="h5">{providerDetails?.rating} ★</Typography>
        </div>
      </ProviderProfile>
      <ProviderContact>
        <MessageIcon fontSize="medium" color="primary" />
        <Link href={`tel:${providerDetails?.phone}`}>
          <PhoneIcon fontSize="medium" color="primary" />
        </Link>
      </ProviderContact>
    </ProviderRow>
  );
};

export default ProviderCard;
