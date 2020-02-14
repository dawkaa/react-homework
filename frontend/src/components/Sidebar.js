import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import AdSense from 'react-adsense';
import Api from './Api';

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  advertise: {
    width: '100%',
    height: '90px',
    overflow: 'hidden',
    background: '#fff4b4',
    lineHeight: '80px',
    textAlign: 'center',
    fontSize: '35px',
  },
}));

export default function Sidebar() {
  const [sidebarData, setSidebarData] = useState({});
  const classes = useStyles();

  useEffect(() => {
    try {
      Api({
        method: 'GET',
        url: 'api/sidebar',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          setSidebarData(response.data);
        });
    } catch (e) {
      throw Error(e);
    }
  }, []);

  return (
    <Grid item xs={12} md={4}>
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Share Social
      </Typography>
      <Link display="block" variant="body1" href="#">
        <Grid container direction="row" spacing={1} alignItems="center">
          <Grid item>
            <FacebookShareButton
              url="www.google.com"
              quote="Check out this website: www.google.com"
            >
              <FacebookIcon />
            </FacebookShareButton>
          </Grid>
        </Grid>
      </Link>
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Advertise
      </Typography>
      <Link display="block" variant="body1" href="http://www.internetsmash.com/p/advertise.html">
        <Grid container direction="row" spacing={1} alignItems="center">
          <Grid item>
            <div className={classes.advertise}>
              Advertise Here
            </div>
          </Grid>
        </Grid>
      </Link>
      <AdSense.Google
        client={process.env.REACT_APP_ADSENSE_ID}
        slot="7806394673"
        style={{ width: 500, height: 300 }}
        format=""
      />
    </Grid>
  );
}
