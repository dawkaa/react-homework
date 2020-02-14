import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Toolbar,
  AppBar,
  Hidden,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  withWidth,
  Popper,
  Grow,
  Paper,
  MenuList,
  MenuItem,
  ClickAwayListener,
} from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { updateNotify } from './actions';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
}));

function Header(props) {
  const classes = useStyles();
  const {
    sections,
    routerRef,
    userData,
    width,
    updateNotify,
  } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openProfile, setOpenProfile] = React.useState(false);
  const anchorRef = React.useRef(null);
  const theme = useTheme();
  const token = Cookies.get('token');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List component="nav">
        {sections.map((section, index) => (
          <ListItem button key={section.id} component="a" href={section.url}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={section.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenProfile(false);
    }
  }

  const handleToggle = () => {
    setOpenProfile((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenProfile(false);
  };

  const handleLogout = (event) => {
    Cookies.remove('token');

    handleClose(event);

    routerRef.current.history.push('/');

    updateNotify('Log out successful');
  };

  return (
    <>
      <AppBar position={isWidthUp('md', width) ? 'sticky' : 'fixed'} color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Hidden smDown implementation="css">
            {sections.map((section) => (
              <Link
                color="inherit"
                noWrap
                key={section.title}
                variant="body2"
                href={section.url}
                className={classes.toolbarLink}
              >
                {section.title}
              </Link>
            ))}
          </Hidden>
          { !!token && !!userData ? (
            <>
              <Link
                color="inherit"
                noWrap
                key="profile"
                variant="body2"
                href="#"
                className={classes.toolbarLink}
                ref={anchorRef}
                aria-controls={openProfile ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                Profile
              </Link>
              <Popper
                open={openProfile}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={openProfile} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                          <MenuItem onClick={handleClose}>{userData.firstName}</MenuItem>
                          <MenuItem onClick={(e) => handleLogout(e)}>Logout</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          ) : (
            <>
              <Link
                color="inherit"
                noWrap
                key="sign in"
                variant="body2"
                href="/sign-in"
                className={classes.toolbarLink}
              >
                Sign in
              </Link>
              <Link
                color="inherit"
                noWrap
                key="sign up"
                variant="body2"
                href="/sign-up"
                className={classes.toolbarLink}
              >
                Sign up
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Hidden lgDown implementation="css">
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Hidden>
    </>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { updateNotify })(withWidth()(Header));

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
