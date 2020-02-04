import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import Api from './Api';

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
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
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        <Typography variant="h6" gutterBottom>
          {sidebarData.title}
        </Typography>
        <Typography>{sidebarData.description}</Typography>
      </Paper>
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Archives
      </Typography>
      {sidebarData && sidebarData.archives && sidebarData.archives.map((archive) => (
        <Link display="block" variant="body1" href={archive.url} key={archive.title}>
          {archive.title}
        </Link>
      ))}
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
    </Grid>
  );
}
