import styled from '@emotion/styled';

import Hero from '../components/home/hero';
import HomeForm from '../components/home/homeForm';
import defaults from '../../defaults';

const StyledContainer = styled('div')({
  height: `calc(100% - ${defaults.navBarHeight})`,
});

const Home = (): JSX.Element => {
  return (
    <StyledContainer>
      <Hero />
      <HomeForm />
    </StyledContainer>
  );
};

export default Home;
