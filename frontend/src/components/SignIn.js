import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Api from './Api';
import { updateNotify } from './actions';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const { setUserData, routerRef, updateNotify } = props;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values, { setFieldError }) => {
            Api({
              method: 'POST',
              url: 'auth',
              headers: {
                'Content-Type': 'application/json',
              },
              data: values,
            }).then((response) => {
              const token = response && response.data && response.data.token;

              if (token) {
                Api({
                  method: 'GET',
                  url: 'me',
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }).then((MeResponse) => {
                  Cookies.set('token', token);
                  setUserData(MeResponse.data);
                  routerRef.current.history.push('/');
                  updateNotify('Login successful');
                });
              }
            }).catch((error) => {
              if (error && error.response && error.response.data) {
                setFieldError('password', error.response.data);
              }
            });
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required('No email provided.'),
            password: Yup.string()
              .required('No password provided.')
              .min(8, 'Password is too short - should be 8 chars minimum.')
              .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
          })}
        >
          {(formikProps) => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
            } = formikProps;
            return (
              <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={(errors.email && touched.email) && errors.email}
                  error={(errors.email && touched.email) && true}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={(errors.password && touched.password) && errors.password}
                  error={(errors.password && touched.password) && true}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/sign-up" variant="body2">
                      Don`&apos;`t have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
}

SignIn.propTypes = {
  setUserData: PropTypes.func,
  updateNotify: PropTypes.func,
};

SignIn.defaultProps = {
  setUserData: PropTypes.func,
  updateNotify: PropTypes.func,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { updateNotify })(SignIn);
