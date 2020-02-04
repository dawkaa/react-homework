import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Snackbar,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Hidden,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import CopyrightIcon from '@material-ui/icons/Copyright';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import CopyToCipboard from './CopyToCipboard';
import CustomScrollbar from './CustomScrollbar';
import Api from './Api';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
}));

const sections = [
  { title: 'Clipboard', url: '/clipboard' },
  { title: 'Custom scrollbar', url: '/custom-scrollbar' },
];

function Blog() {
  const classes = useStyles();
  const [featuredPostsData, setFeaturedPostsData] = useState([]);
  const [open, setOpen] = useState(false);
  const [bottomNavigationValue, setBottomNavigation] = useState(0);
  const routerRef = useRef(null);

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    localStorage.setItem('joinSite', true);
  };

  useEffect(() => {
    setOpen(true);
    try {
      Api({
        method: 'GET',
        url: 'api/featuredPosts',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          setFeaturedPostsData(response.data);
        });
    } catch (e) {
      throw Error(e);
    }
  }, []);

  const isJoinSite = localStorage.getItem('joinSite');

  function switchWindow(value) {
    switch (value) {
      case 0:
        routerRef.current.history.push('/');
        break;
      case 1:
        routerRef.current.history.push('/clipboard');
        break;
      case 2:
        routerRef.current.history.push('/custom-scrollbar');
        break;
      default:
        break;
    }
  }

  return (
    <>
      <Router ref={routerRef}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="Blog" sections={sections} />
          <Switch>
            <Route path="/" exact>
              <main>
                <MainFeaturedPost />
                <Grid container spacing={4}>
                  {featuredPostsData && featuredPostsData.map((post) => (
                    <FeaturedPost key={post.title} post={post} />
                  ))}
                </Grid>
                <Grid container spacing={5} className={classes.mainGrid}>
                  <Main title="From the firehose" />
                  <Sidebar />
                </Grid>
              </main>
            </Route>
            <Route path="/clipboard">
              <Grid container spacing={5} className={classes.mainGrid}>
                <CopyToCipboard title="React copy to clipboard" />
                <Sidebar />
              </Grid>
            </Route>
            <Route path="/custom-scrollbar">
              <Grid container spacing={5} className={classes.mainGrid}>
                <CustomScrollbar title="React custom scrollbars" />
                <Sidebar />
              </Grid>
            </Route>
          </Switch>
        </Container>
        <Footer title="Footer" description="Something here to give the footer a purpose!" />
      </Router>
      { !isJoinSite && (
        <Snackbar
          open={open}
          autoHideDuration={2000}
          message="Welcome to my site"
          action={(
            <Button color="inherit" size="small" onClick={handleCloseSnack}>
              X
            </Button>
          )}
          onClose={handleCloseSnack}
          className={classes.snackbar}
        />
      )}
      <Hidden smUp implementation="css">
        <BottomNavigation
          value={bottomNavigationValue}
          onChange={(event, newValue) => {
            setBottomNavigation(newValue);
            switchWindow(newValue);
          }}
          showLabels
          className={classes.stickToBottom}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Copyright" icon={<CopyrightIcon />} />
          <BottomNavigationAction label="Sync alt" icon={<SyncAltIcon />} />
        </BottomNavigation>
      </Hidden>
    </>
  );
}

export default Blog;
