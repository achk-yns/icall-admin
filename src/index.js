import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { ContextProvider } from './contexts/ContextProvider'

const theme = createTheme({
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
          },
        },
      });
      


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(

                <ContextProvider>
                        <ThemeProvider theme={theme}>
                        <App />
                        </ThemeProvider>
                </ContextProvider>
                

)