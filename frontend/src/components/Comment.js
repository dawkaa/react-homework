import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { fetchComment } from './actions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

function Comment(props) {
  const classes = useStyles();
  const { comments, fetchComment } = props;

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <List className={classes.root}>
      { comments && comments.map((comment) => (
        <ListItem alignItems="flex-start" key={comment.id}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Guest"
            secondary={(
              <>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  { comment.description }
                </Typography>
              </>
            )}
          />
        </ListItem>
      ))}
      <Divider variant="inset" component="li" />
    </List>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchComment: () => {
    dispatch(fetchComment());
  },
});

const mapStateToProps = (state) => ({
  comments: state.comment.comments,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Comment);
