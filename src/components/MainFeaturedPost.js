import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { connect } from 'react-redux';
import { handleMainFeaturedPost } from './actions';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

function MainFeaturedPost(props) {
  const classes = useStyles();

  useEffect(() => {
    const { handleMainFeaturedPost } = props;
    handleMainFeaturedPost();
  }, []);
  const { mainFeaturedPostData } = props;

  return (
    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${mainFeaturedPostData.image})` }}>
      <img style={{ display: 'none' }} src={mainFeaturedPostData.image} alt={mainFeaturedPostData.imageText} />
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {mainFeaturedPostData.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {mainFeaturedPostData.description}
            </Typography>
            <Link href="#" variant="subtitle1">
              {mainFeaturedPostData.linkText}
            </Link>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

const mapDispatchToProps = (dispatch) => ({
  handleMainFeaturedPost: () => {
    dispatch(handleMainFeaturedPost());
  },
});

const mapStateToProps = (state) => ({
  mainFeaturedPostData: state.mainFeaturedPostReduder.mainFeaturedPostData,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainFeaturedPost);
