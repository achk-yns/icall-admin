import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// Material-UI components
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

// Third-party libraries
import * as Yup from 'yup';

// Icons
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

// Context
import { AuthContext } from '../contexts/authContext'; // Adjust path if necessary

const AuthLogin = ({ isDemo = false }) => {
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext); // Using AuthContext for authentication operations
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  // Function to show error toast message
  const showErrorToast = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  // Handle password visibility toggle
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Form submission handling
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
    });

    try {
      await validationSchema.validate({ email, password }, { abortEarly: false });

      // Set loading state
      setLoading(true);

      const result = await login(email, password);
      
      setLoading(false);

      if (result) {
        navigate("/")
        window.location.reload(); // You may replace this with proper navigation logic
      } else {
        // Display error toast if login failed
        showErrorToast(result.message);
      }
    } catch (err) {
      // Handle validation errors or other errors
      if (err.name === 'ValidationError') {
        // Handle validation errors
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        // Handle other errors (e.g., network error)
        console.error('Login error:', err.message);
        showErrorToast(err.message);
      }

      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-login">Email Address</InputLabel>
              <OutlinedInput
                id="email-login"
                type="email"
                value={email}
                name="email"
                onBlur={() => {
                  const validationSchema = Yup.string().email('Must be a valid email').max(255).required('Email is required');
                  try {
                    validationSchema.validateSync(email);
                    setErrors((prev) => ({ ...prev, email: null }));
                  } catch (err) {
                    setErrors((prev) => ({ ...prev, email: err.message }));
                  }
                }}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                fullWidth
                error={Boolean(errors.email)}
              />
            </Stack>
            {errors.email && (
              <Typography color="error">{errors.email}</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-login">Password</InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(errors.password)}
                id="password-login"
                type={showPassword ? 'text' : 'password'}
                value={password}
                name="password"
                onBlur={() => {
                  const validationSchema = Yup.string().max(255).required('Password is required');
                  try {
                    validationSchema.validateSync(password);
                    setErrors((prev) => ({ ...prev, password: null }));
                  } catch (err) {
                    setErrors((prev) => ({ ...prev, password: err.message }));
                  }
                }}
                onChange={(e) => setPassword(e.target.value)}
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
            {errors.password && (
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
            <Button disableElevation disabled={loading} fullWidth size="large" type="submit" variant="contained" color="primary">
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

AuthLogin.propTypes = {
  isDemo: PropTypes.bool, // PropTypes validation for isDemo prop
};

export default AuthLogin;
