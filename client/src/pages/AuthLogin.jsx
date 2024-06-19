  import PropTypes from 'prop-types';
  import React from 'react';
  import { Link as RouterLink } from 'react-router-dom';
  import 'react-toastify/dist/ReactToastify.css';
  import { ToastContainer, toast } from 'react-toastify';
  // material-ui
  import Button from '@mui/material/Button';
  import Checkbox from '@mui/material/Checkbox';
  import FormControlLabel from '@mui/material/FormControlLabel';
  import Grid from '@mui/material/Grid';
  import Link from '@mui/material/Link';
  import InputAdornment from '@mui/material/InputAdornment';
  import IconButton from '@mui/material/IconButton';
  import InputLabel from '@mui/material/InputLabel';
  import OutlinedInput from '@mui/material/OutlinedInput';
  import Stack from '@mui/material/Stack';
  import Typography from '@mui/material/Typography';

  // third party
  import * as Yup from 'yup';
  import { Formik } from 'formik';

  // project import
  import EyeOutlined from '@ant-design/icons/EyeOutlined';
  import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
  import { useDispatch, useSelector } from 'react-redux';
  import { login } from '../auth/authSlice';

  export default function AuthLogin({ isDemo = false }) {
    const [checked, setChecked] = React.useState(false);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState(false);
    const { error, loading } = useSelector((state) => state.auth);

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const showErrorToast = (message) => {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER
      });
    };

    return (
      <>
      <ToastContainer /> 
        <Formik
          initialValues={{
            email: '',
            password: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            password: Yup.string().max(255).required('Password is required')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              await dispatch(login(values));
              window.location.reload();
            } catch (error) {
              console.error('Login error:', error.message);
              toast.error(error.message); // Display error message as a toast
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email-login">Email Address</InputLabel>
                    <OutlinedInput
                      id="email-login"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                    />
                  </Stack>
                  {touched.email && errors.email && (
                    <Typography color="error">{errors.email}</Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="password-login">Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id="password-login"
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            color="secondary"
                          >
                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Enter password"
                    />
                  </Stack>
                  {touched.password && errors.password && (
                    <Typography color="error">{errors.password}</Typography>
                  )}
                </Grid>

                <Grid item xs={12} sx={{ mt: -1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(event) => setChecked(event.target.checked)}
                          name="checked"
                          color="primary"
                          size="small"
                        />
                      }
                      label={<Typography variant="h6">Keep me signed in</Typography>}
                    />
                    <Link variant="h6" component={RouterLink} color="text.primary">
                      Forgot Password?
                    </Link>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Button disableElevation disabled={isSubmitting || loading} fullWidth size="large" type="submit" variant="contained" color="primary">
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </>
    );
  }

  AuthLogin.propTypes = { isDemo: PropTypes.bool };
