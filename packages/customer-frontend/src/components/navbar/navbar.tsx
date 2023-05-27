import styled from '@emotion/styled';
import { AppBar, Toolbar, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { theme } from '../../theme';

const StyledAppBar = styled(AppBar)({
  backgroundColor: theme.palette.primary.main,
});

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const EmptyDiv = styled('div')({
  width: '2.25rem',
});

export const Navbar = (): JSX.Element => {
  return (
    <StyledAppBar position="static">
      <StyledToolbar variant="dense">
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h2">Roadside Assist</Typography>
        <EmptyDiv />
      </StyledToolbar>
    </StyledAppBar>
  );
};
