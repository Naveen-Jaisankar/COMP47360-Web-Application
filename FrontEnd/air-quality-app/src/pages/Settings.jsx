import { useContext } from 'react';
import { Switch, Slider, Typography, Paper, Container } from '@mui/material';
import { SettingsContext } from '../context/SettingsContext';
import { styled } from '@mui/system';
import constant from '../constant';


const ColumnContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  padding: 2,
})

const SettingsPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 3,
  borderRadius: 2,
 
})


const Settings = () =>{

    //importing all features and functions from settingscontext
    //Refer SettingsContext.jsx
    const {darkMode, toggleDarkMode, fontSize, changeFontSize} = useContext(SettingsContext);

    const handleFontSizeChange = (_event, newValue) => {
        changeFontSize(newValue);
    };

    return (
        <ColumnContainer
          component="main"
          maxWidth="xs"
          sx={{
            backgroundColor: darkMode ? 'grey.900' : 'grey.100',
            color: darkMode ? 'grey.300' : 'grey.900',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            {constant.settings.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {constant.settings.body}
          </Typography>
          <SettingsPaper elevation={3} sx={{
            
            backgroundColor: darkMode ? 'grey.800' : 'white',
          }}>
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <Typography variant="body1">{constant.settings.text_size}</Typography>
                <Slider value={fontSize} onChange={handleFontSizeChange} aria-labelledby="text-size-slider" min={10} max={30} />
              </div>
              <div className="flex items-center">
                <Typography variant="body1" className="mr-2">{constant.settings.dark_mode}</Typography>
                <Switch checked={darkMode} onChange={toggleDarkMode} name="darkMode" color="primary"/>
              </div>
            </div>
          </SettingsPaper>
        </ColumnContainer>
      );
};

export default Settings;