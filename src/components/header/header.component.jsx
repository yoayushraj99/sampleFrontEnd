import React from 'react';
import {
  Button,
  Box,
  Grid,
  createMuiTheme,
  ThemeProvider,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#006400',
    },
    secondary: {
      main: '#ffa500',
    },
  },
});

function Header() {
  const classes = useStyles();
  const navBar = {
    paddingLeft: '55px',
    paddingRight: '55px',
    backgroundColor: 'lightBlue',
    height: '81px',
    width: '100%',
  };

  const responsiveImg = {
    Width: '100%',
    maxWidth: '78px',
    height: 'auto',
  };

  const preventDefault = (event) => event.preventDefault();

  return (
    <>
      <Box position="fixed" className={classes.appBar}>
        <div className="row" style={navBar}>
          <Grid container alignItems="center">
            <Grid item lg={3} md={3}>
              <Box display="flex" justifyContent="center">
                <img
                  src="https://clipartcraft.com/images/email-logo-png-us-4.png"
                  alt="mailLogo"
                  style={responsiveImg}
                ></img>
              </Box>
            </Grid>
            <Grid item lg={6} md={6}>
              <Box display="flex" justifyContent="center">
                <Box component="span" px={4}>
                  <Link href="#" onClick={preventDefault}>
                    Home
                  </Link>
                </Box>
                <Box component="span" px={4}>
                  <Link href="#" onClick={preventDefault}>
                    About Us
                  </Link>
                </Box>
                <Box component="span" px={4}>
                  <Link href="#" onClick={preventDefault}>
                    Products
                  </Link>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3} md={3}>
              <Box display="flex" justifyContent="center">
                <Box component="span" px={2} pt={0.58}>
                  <SearchIcon />
                </Box>
                <Box component="span" px={2}>
                  <ThemeProvider theme={theme}>
                    <Button variant="outlined" color="primary">
                      Login
                    </Button>
                  </ThemeProvider>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
}

export default Header;
