import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeContextProvider } from './context/SettingsContext.jsx'

// The normal theme + dark theme could be specified here
// https://mui.com/material-ui/customization/palette/
// https://mui.com/material-ui/customization/default-theme/

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>
  </React.StrictMode>,
)
