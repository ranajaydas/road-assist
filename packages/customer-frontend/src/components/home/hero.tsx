import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import heroImage from '../../assets/HeroImage.png';

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  height: '50%',
});

const Hero = (): JSX.Element => {
  return (
    <StyledBox>
      <div>
        <img width="200" alt="car with an open bonnet" src={heroImage} />
        <Typography variant="h1">How can we assist?</Typography>
      </div>
    </StyledBox>
  );
};

export default Hero;
