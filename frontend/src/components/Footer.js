import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

function Copyright(props) {
  const { classes } = props;
  return (
    <Typography variant="body2" color="textSecondary" align="center" className={classes.copyright}>
      {'Copyright © '}
      All Rights Reserved.
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 6),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(5),
    },
  },
  copyright: {
    marginTop: theme.spacing(8),
    borderTop: '1px solid #f0f0f0',
    padding: '25px 0 25px 0',
    position: 'relative',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <Grid item container direction="column">
            <Typography gutterBottom variant="h6">
              Resources
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              About us
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Terms of service
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              FAQs
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid item container direction="column">
            <Typography gutterBottom variant="h6">
              Support
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Contact Support
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid item container direction="column">
            <Typography gutterBottom variant="h6">
              Contact
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Address
            </Typography>
            <Typography color="textSecondary">
              143 Doty Circle, West Springfield, MA 01089, USA
            </Typography>
            <Typography variant="subtitle1">Phone:</Typography>
            <Typography color="textSecondary">(413) 732-3899</Typography>
            <Typography variant="subtitle1">Email:</Typography>
            <Typography color="textSecondary">noreply@github.com</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Copyright classes={classes} />
    </footer>
  );
}
