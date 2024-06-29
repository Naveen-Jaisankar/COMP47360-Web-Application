import { useContext } from 'react';
import { Switch, Slider, Typography, Paper, Container } from '@mui/material';
import { SettingsContext } from '../context/SettingsContext';

const Settings = () =>{

    //importing all features and functions from settingscontext
    //Refer SettingsContext.jsx
    const {darkMode, toggleDarkMode, fontSize, changeFontSize} = useContext(SettingsContext);

    const handleFontSizeChange = (_event, newValue) => {
        changeFontSize(newValue);
    };

    return (
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: darkMode ? 'grey.900' : 'grey.100',
            color: darkMode ? 'grey.300' : 'grey.900',
            padding: 2,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Settings
          </Typography>
          <Typography variant="body1" gutterBottom>
            Change the look of the website to suit you better
          </Typography>
          <Paper elevation={3} sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 3,
              borderRadius: 2,
              backgroundColor: darkMode ? 'grey.800' : 'white',
            }}
          >
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <Typography variant="body1">Text Size</Typography>
                <Slider value={fontSize} onChange={handleFontSizeChange} aria-labelledby="text-size-slider" min={10} max={30} />
              </div>
              <div className="flex items-center">
                <Typography variant="body1" className="mr-2">Dark Mode</Typography>
                <Switch checked={darkMode} onChange={toggleDarkMode} name="darkMode" color="primary"/>
              </div>
            </div>
          </Paper>
        </Container>
      );
};

export default Settings;