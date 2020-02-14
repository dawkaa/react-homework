import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Divider,
  TextField,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Comment from './Comment';
import { updateComment } from './actions';

const useStyles = makeStyles((theme) => ({
  divider: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
}));

function Travel(props) {
  const { title, updateComment, comments } = props;
  const classes = useStyles();
  const [commentValue, setCommentValue] = useState('');

  function onChange({ target: { value } }) {
    setCommentValue(value);
  }

  function handleSubmit() {
    if (!commentValue) {
      return null;
    }

    if (comments.length > 5) {
      return null;
    }

    updateComment(commentValue);

    return null;
  }

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <Scrollbars
        style={{ height: 400 }}
      >
        <p>by | Posted on February 11, 2020</p>
        <p>Summary of content of this post</p>
        <span>
          You’re thinking of organizing a trip to New Zealand on
          your own but you have no idea where to start? Don’t worry!
          That’s what we’re here for. In this post we are going to tell
          you absolutely EVERYTHING you need to know to prepare the perfect
          trip to New Zealand without dying in the attempt: visas, necessary
          documentation, where to rent the camper, where to sleep with it…
          So here we are going to collect all the useful and necessary information
          to organize a trip to New Zealand by caravan/camper/car on your own.
          If you are thinking of travelling to New Zealand, be sure to check out
          our COMPLETE GUIDE TO NEW ZEALAND.

          NEW ZEALAND GUIDE

          Because it is true that preparing a trip of this magnitude is a super
          challenge and we want to make it MUCH easier for you And really,
          it may seem like a world when you start, but you’ll see how as we move
          forward you’ll realize that it’s a piece of cake.

          And also, at the end we will leave you our travel template for New Zealand,
          in case you want to use it too. We are sure that it will help you plan everything
          much better and… it’s FREE!

          IATI DISCOUNT: Get the best travel insurance for New Zealand
        </span>
        <p>
          <span role="img" aria-label="Panda">🎬</span>
          {' '}
          Subscribe to our Youtube channel here: http://bit.ly/SuscríbeteAComiviajeros 🎬
        </p>
        <p>
          <span role="img" aria-label="Panda">💰</span>
          Organize a trip to New Zealand: budget
          Normally when we write this type of organizational
          post we don’t include this section, but in the case of
          New Zealand, we thought it was important.
          Because New Zealand is an expensive trip, and you have
          to be clear about that before you start organizing so
          you don’t get any surprises when it’s already late.
          We did a 21-day camper route and spent about 4,600 euros per person.
        </p>
      </Scrollbars>
      <Divider className={classes.divider} />
      <Grid container direction="row" spacing={3}>
        <Grid item xs={6}>
          <TextField fullWidth label="Write a comment" onChange={onChange} value={commentValue} />
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>post</Button>
        </Grid>
        <Grid item xs={12}>
          <Comment />
        </Grid>
      </Grid>
    </Grid>
  );
}

Travel.propTypes = {
  updateComment: PropTypes.func,
  title: PropTypes.string,
};

Travel.defaultProps = {
  updateComment: PropTypes.func,
  title: PropTypes.string,
};

const mapStateToProps = (state) => ({
  comments: state.comment.comments,
});

export default connect(mapStateToProps, { updateComment })(Travel);
