import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from './components';
import { Orders, Employees, CreateUser, Login, DetailRend, AjouterRend, ModifierRend } from './pages';
import './App.css';
import { AuthProvider, useAuth } from './contexts/authContext';
import { RendezVousProvider } from './contexts/RendezVousContext';

const App = () => {
  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL); // Ensure API URL is logged correctly
  }, []);

  return (
    <AuthProvider>
      <RendezVousProvider>
        <AppContent />
      </RendezVousProvider>
    </AuthProvider>
  );
};

const AppContent = () => {
  const { user, loading, token } = useAuth();

  // Optional: You can handle setLoading if needed, based on useAuth implementation

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'var(--main-bg)' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <div className='dark:bg-main-dark-bg'>
        {user && token ? (
          <>
            <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg'>
              <Navbar />
            </div>
            <div style={{ marginBottom: 20 }}>
              <Routes>
                {user.ROLE === 'admin' && (
                  <>
                    <Route path='/Rendez-Vous' element={<Orders />} />
                    <Route path='/Rendez-Vous/create' element={<AjouterRend />} />
                    <Route path='/Rendez-Vous/:NOM' element={<DetailRend />} />
                    <Route path='/Rendez-Vous/:NOM/edit' element={<ModifierRend />} />
                    <Route path='/Utilisateurs' element={<Employees />} />
                    <Route path='/Utilisateurs/ajouter' element={<CreateUser />} />
                  </>
                )}
                {user.ROLE === 'agent' && (
                  <>
                    <Route path='/Rendez-Vous' element={<Orders />} />
                    <Route path='/Rendez-Vous/create' element={<AjouterRend />} />
                  </>
                )}
                {user.ROLE === 'superviseur' && (
                  <>
                    <Route path='/Rendez-Vous' element={<Orders />} />
                    <Route path='/Rendez-Vous/create' element={<AjouterRend />} />
                    <Route path='/Rendez-Vous/:NOM' element={<DetailRend />} />
                    <Route path='/Rendez-Vous/:NOM/edit' element={<ModifierRend />} />
                    <Route path='/Utilisateurs' element={<Employees />} />
                    <Route path='/Utilisateurs/ajouter' element={<CreateUser />} />
                  </>
                )}
                {user.ROLE === 'installeur' && (
                  <>
                    <Route path='/Rendez-Vous' element={<Orders />} />
                    <Route path='/Rendez-Vous/:NOM' element={<DetailRend />} />
                  </>
                )}
                <Route path='*' element={<Navigate to='/Rendez-Vous' />} />
              </Routes>
            </div>
          </>
        ) : (
          <div className='w-full min-h-screen flex items-center justify-center dark:bg-main-dark-bg bg-main-bg'>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<Navigate to='/login' />} />
            </Routes>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
