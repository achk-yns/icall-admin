import React, { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
 // Adjust the path as needed

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { AuthContext } from '../contexts/authContext';

export default function AuthRegister() {
  const navigate = useNavigate();
  const { register, loading, error } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          NOM: '',
          PRENOM: '',
          EMAIL: '',
          PASSWORD: '',
        }}
        onSubmit={async (values) => {
          await register(values);
          if (!error) {
            alert('Registration Success');
            navigate('/');
          } else {
            alert('Registration failed');
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="firstname-signup">Nom*:</InputLabel>
                  <OutlinedInput
                    id="firstname-login"
                    type="text"
                    value={values.NOM}
                    name="NOM"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.NOM && errors.NOM)}
                  />
                </Stack>
                {touched.NOM && errors.NOM && (
                  <FormHelperText error id="helper-text-firstname-signup">
                    {errors.NOM}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastname-signup">Prenom*:</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.PRENOM && errors.PRENOM)}
                    id="lastname-signup"
                    type="text"
                    value={values.PRENOM}
                    name="PRENOM"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Doe"
                  />
                </Stack>
                {touched.PRENOM && errors.PRENOM && (
                  <FormHelperText error id="helper-text-lastname-signup">
                    {errors.PRENOM}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email*:</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.EMAIL && errors.EMAIL)}
                    id="email-signup"
                    type="email"
                    value={values.EMAIL}
                    name="EMAIL"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                  />
                </Stack>
                {touched.EMAIL && errors.EMAIL && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.EMAIL}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Password*:</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.PASSWORD && errors.PASSWORD)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.PASSWORD}
                    name="PASSWORD"
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
                    placeholder=""
                  />
                </Stack>
                {touched.PASSWORD && errors.PASSWORD && (
                  <FormHelperText error id="helper-text-password-signup">
                    {errors.PASSWORD}
                  </FormHelperText>
                )}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: '#FF5722', width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        Weak
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  By signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <FormHelperText error>{error}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  disableElevation
                  disabled={loading || isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
