
import { Link } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


import AuthLogin from './AuthLogin';
import { Box } from '@mui/material';
import AuthCard from './AuthCard';
import AuthRegister from './AuthRegister';


// ================================|| LOGIN ||================================ //

export default function Login() {
  return (

    <Box sx={{ minHeight: '100vh' }}>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
          >
            <Grid item>
              <AuthCard>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                      <Typography variant="h6">Login</Typography>
                      <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                        Don&apos;t have an account?
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthRegister />
                  </Grid>
                </Grid>
              </AuthCard>
              </Grid>
          </Grid>
        </Grid>
    </Grid>
    
  </Box>

          );
}





























// import React, { useState, useEffect } from "react";
// import "../styles/Login.scss";
// import { useDispatch, useSelector } from "react-redux";
// import { login, loadUser } from "../auth/authSlice";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const { user, token, loading, error } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(loadUser());
//   }, [dispatch]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(login({ email, password }));
//   };

//   return (
//     <div className="login">
//       <div className="login_content">
//         <form className="login_content_form" onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit" disabled={loading}>
//             {loading ? "Logging in..." : "LOG IN"}
//           </button>
//         </form>
//         {error && <div className="error">{error}</div>}
//         {user && (
//           <div className="success text-light">
//             Welcome, user with ID: {user._id}!
//           </div>
//         )}
//         <a href="/register">Don't have an account? Sign Up Here</a>
//       </div>
//     </div>
//   );
// };

// export default Login;
