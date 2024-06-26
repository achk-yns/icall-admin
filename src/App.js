import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar, Sidebar } from './components';
import { Home, Orders, Employees ,Login ,Registration,DetailRend , AjouterRend, ModifierRend } from './pages';
import './App.css';
import { AuthProvider, useAuth } from './contexts/authContext'; // Adjust path as needed
import { useStateContext } from './contexts/ContextProvider';
import { RendezVousProvider } from './contexts/RendezVousContext';


const App = () => {
  useEffect(()=>{
    console.log(process.env.REACT_APP_API_URL);

  },[])
  return (
    <AuthProvider>
      <RendezVousProvider>
        <AppContent />
      </RendezVousProvider>
    </AuthProvider>
  );
};

const AppContent = () => {
  const { user, loading, token ,setLoading} = useAuth();
  const { activeMenu } = useStateContext();

  useEffect(() => {
    console.log(token, user);
    if(!token){
      setLoading(false);
    }
  }, [token, user]);

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
              <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg '>
                <Navbar />
              </div>
              <div style={{marginBottom:20}}>
                <Routes>
                  <Route path='/Rendez-Vous' element={<Orders />} />
                  <Route path='/Rendez-Vous/create' element={<AjouterRend />} />
                  <Route path='/Rendez-Vous/:NOM' element={<DetailRend />} />
                  <Route path='/Rendez-Vous/:NOM/edit' element={<ModifierRend />} />
                  <Route path='/Utilisateurs' element={<Employees />} />
                  <Route path='*' element={<Navigate to='/Rendez-vous' />} />
                </Routes>
              </div>
          </>
        ) : (
          <div className='w-full min-h-screen flex items-center justify-center dark:bg-main-dark-bg bg-main-bg'>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Registration />} />
              <Route path='*' element={<Navigate to='/login' />} />
            </Routes>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
