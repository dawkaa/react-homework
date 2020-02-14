import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import Api from './Api';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const { setUserData, routerRef } = props;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          }}
          onSubmit={(values, { setFieldError }) => {
            Api({
              method: 'POST',
              url: 'api/register',
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
                }).then((meResponce) => {
                  Cookies.set('token', token);
                  setUserData(meResponce.data);
                  routerRef.current.history.push('/');
                });
              }
            }).catch((error) => {
              if (error && error.response && error.response.data) {
                setFieldError('password', error.response.data);
              }
            });
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required('No firstname provided.'),
            lastName: Yup.string().required('No lastname provided.'),
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
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={(errors.firstName && touched.firstName) && true}
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={(errors.firstName && touched.firstName) && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={(errors.lastName && touched.lastName) && true}
                      variant="outlined"
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={(errors.lastName && touched.lastName) && errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={(errors.email && touched.email) && true}
                      variant="outlined"
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={(errors.email && touched.email) && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={(errors.password && touched.password) && true}
                      variant="outlined"
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
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/sign-in" variant="body2">
                      Already have an account? Sign in
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

SignUp.propTypes = {
  setUserData: PropTypes.func,
};

SignUp.defaultProps = {
  setUserData: PropTypes.func,
};
