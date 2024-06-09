import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ThemeProvider, createTheme} from '@mui/material'

// The normal theme + dark theme could be specified here
// https://mui.com/material-ui/customization/palette/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
