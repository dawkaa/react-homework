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
import FlightIcon from '@material-ui/icons/Flight';
import WCIcon from '@material-ui/icons/Wc';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Cookies from 'js-cookie';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Travel from './Travel';
import Api from './Api';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { emptyNotify } from './actions';
import AboutUs from './AboutUs';
import $ from 'jquery';

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
  emptySpace: {
    paddingBottom: theme.spacing(7),
  },
  toTop: {
    position: 'sticky',
    bottom: '71px',
    marginLeft: '90%',
  },
}));

const sections = [
  { id: 100, title: 'Home', url: '/' },
  { id: 101, title: 'Travel', url: '/travel' },
  { id: 103, title: 'About', url: '/about-us' },
];

function Blog(props) {
  const classes = useStyles();
  const [featuredPostsData, setFeaturedPostsData] = useState([]);
  const [bottomNavigationValue, setBottomNavigation] = useState(0);
  const routerRef = useRef(null);
  const mainRef = useRef(null);
  const [userData, setUserData] = useState(false);
  const { notify, notifyData, emptyNotify } = props;

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    emptyNotify();
  };

  useEffect(() => {
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

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      Api({
        method: 'GET',
        url: 'me',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        setUserData(response.data);
        ReactGA.set({ userId: response.data.id });
      });
    }
  }, []);

  function switchWindow(value) {
    switch (value) {
      case 0:
        routerRef.current.history.push('/');
        break;
      case 1:
        routerRef.current.history.push('/travel');
        break;
      case 2:
        routerRef.current.history.push('/about-us');
        break;
      default:
        break;
    }
  }

  function scrollToTop() {
    mainRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    function toTopButton(e) {
      const toTop = $("#totop");
      toTop.removeClass("off on");
      "on" === e ? toTop.addClass("on") : toTop.addClass("off");
    }

    $(window).scroll(function() {
      let e;
      const scrollTop = $(this).scrollTop();
      const height = $(this).height();

      e = scrollTop > 0 ? scrollTop + height : 1;

      toTopButton(e < 1100 ? "off" : "on");
    });
  });

  return (
    <div ref={mainRef}>
      <Router ref={routerRef}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="Blog" sections={sections} routerRef={routerRef} userData={userData} />
          <Hidden smUp implementation="css">
            <div className={classes.emptySpace} />
          </Hidden>
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
            <Route path="/about-us">
              <Grid container spacing={5} className={classes.mainGrid}>
                <AboutUs title="Contact us" />
                <Sidebar />
              </Grid>
            </Route>
            <Route path="/travel">
              <Grid container spacing={5} className={classes.mainGrid}>
                <Travel
                  title="Organising a trip to New Zealand in a caravan: ALL you need to know"
                />
                <Sidebar />
              </Grid>
            </Route>
            <Route path="/sign-in">
              <Grid container spacing={5} className={classes.mainGrid}>
                <SignIn setUserData={setUserData} routerRef={routerRef} />
              </Grid>
            </Route>
            <Route path="/sign-up">
              <Grid container spacing={5} className={classes.mainGrid}>
                <SignUp routerRef={routerRef} setUserData={setUserData} />
              </Grid>
            </Route>
          </Switch>
          <Footer title="Footer" description="Something here to give the footer a purpose!" />
          <div
            className={classes.toTop}
            id="totop"
          >
            <ArrowUpwardIcon onClick={scrollToTop} fontSize="large" />
          </div>
        </Container>
      </Router>
      { notify && (
        <Snackbar
          open={notify}
          autoHideDuration={2000}
          message={notifyData}
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
          <BottomNavigationAction label="Travel" icon={<FlightIcon />} />
          <BottomNavigationAction label="About us" icon={<WCIcon />} />
        </BottomNavigation>
      </Hidden>
    </div>
  );
}

const mapStateToProps = (state) => ({
  notify: state.notify.notify,
  notifyData: state.notify.notifyData,
});

export default connect(mapStateToProps, { emptyNotify })(Blog);
