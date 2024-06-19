import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar, Sidebar } from './components';
import { Home, Orders, Employees } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import Login from './pages/Login';

import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './auth/authSlice';
import RegisterPage from './pages/RegisterPage';
import DetailRensez from './pages/DetailRensez';
import AddRendez from './pages/AddRendez';

const App = () => {
  const { activeMenu } = useStateContext();
  const dispatch = useDispatch();
  const { user, token, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'var(--main-bg)' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <div className='flex relative dark:bg-main-dark-bg'>
        <div className='fixed right-4 bottom-4' style={{ zIndex: '1000' }}>
          <TooltipComponent content='Settings'   position='Top'>
            <button type='button'  className='text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white' style={{ background: 'blue', borderRadius: '50%' }}>
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>

        {user && token ? (
          <>
            {activeMenu ? (
              <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
                <Sidebar />
              </div>
            ) : (
              <div className='w-0 dark:bg-secondary-dark-bg'>
                <Sidebar />
              </div>
            )}

            <div className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2'}`}>
              <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
                <Navbar />
              </div>

              <div>
                <Routes>
                  {/* Protected Routes */}
                  <Route path='/' element={<Home />} />
                  <Route path='/Rendez-Vous' element={<Orders />} />
                  <Route path='/Rendez-Vous/create' element={<AddRendez />} />
                  <Route path='/Rendez-Vous/:NOM' element={<DetailRensez />} />
                  <Route path='/Utilisateurs' element={<Employees />} />
                  <Route path='*' element={<Navigate to='/' />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <div className='w-full min-h-screen flex items-center justify-center dark:bg-main-dark-bg bg-main-bg'>
            <Routes>
              {/* Public Routes */}
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='*' element={<Navigate to='/login' />} />
            </Routes>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
