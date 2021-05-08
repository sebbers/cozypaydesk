import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Chip,
  Divider,
  Hidden,
  IconButton,
  Link,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '../icons/Menu';
import Logo from './Logo';

const MainNavbar = (props) => {
  const { onSidebarMobileOpen } = props;

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.secondary'
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarMobileOpen}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Typography
            color="textPrimary"
            variant="h6"
          >
            CozyPayDesk
          </Typography>
        </Hidden>
        <Hidden lgDown>
          <RouterLink to="/">
            <Logo
              sx={{
                height: 40,
                width: 40
              }}
            />
          </RouterLink>
          <Typography
            color="textPrimary"
            variant="h6"
          >
            CozyPayDesk
          </Typography>
        </Hidden>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden mdDown>
          <Link
            color="textSecondary"
            component={RouterLink}
            to="/browse"
            underline="none"
            variant="body1"
            mr={1.5}
          >
            Features
          </Link>
          <Link
            color="textSecondary"
            component={RouterLink}
            to="/browse"
            underline="none"
            variant="body1"
            mr={1.5}
          >
            Customers
          </Link>
          <Link
            color="textSecondary"
            component={RouterLink}
            to="/browse"
            underline="none"
            variant="body1"
            mr={1.5}
          >
            Pricing
          </Link>
          <Link
            color="textSecondary"
            component={RouterLink}
            to="/browse"
            underline="none"
            variant="body1"
            mr={1.5}
          >
            Help Center
          </Link>
          {/* <Link
            color="textSecondary"
            component={RouterLink}
            to="/browse"
            underline="none"
            variant="body1"
          >
            Browse Components
          </Link>
          <Chip
            color="primary"
            label="NEW"
            size="small"
            sx={{
              maxHeight: 20,
              ml: 1,
              mr: 2
            }}
          />
          <Link
            color="textSecondary"
            component={RouterLink}
            to="/docs"
            underline="none"
            variant="body1"
          >
            Documentation
          </Link>
          <Divider
            orientation="vertical"
            sx={{
              height: 32,
              mx: 2
            }}
          /> */}
          <Box mr={1}>
            <Button component={ RouterLink } to="/authentication/login" variant="contained" color="primary">
                Login
            </Button>
            {/* <Button
              color="primary"
              component="a"
              href="https://material-ui.com/store/items/devias-kit-pro"
              size="small"
              target="_blank"
              variant="contained"
            >
              Login
            </Button> */}
          </Box>
          <Button component={ RouterLink } to="/authentication/register" variant="contained" color="secondary">
              Sign Up
          </Button>
          {/* <Button
            color="secondary"
            component="a"
            href="https://material-ui.com/store/items/devias-kit-pro"
            size="small"
            target="_blank"
            variant="contained"
          >
            Sign Up
          </Button> */}
        </Hidden>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

MainNavbar.propTypes = {
  onSidebarMobileOpen: PropTypes.func
};

export default MainNavbar;
