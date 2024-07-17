import { useContext, useState } from 'react';
import { Switch, Slider, Typography, Paper, Container, Button, Menu, MenuItem } from '@mui/material';
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
});

const SettingsPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 3,
  borderRadius: 2,
});

const WideMenuItem = styled(MenuItem)({
  margin: '1rem',
  width: '30rem',
  // backgroundColor: "black"
});

const Settings = () => {
  const { darkMode, toggleDarkMode, fontSize, changeFontSize } = useContext(SettingsContext);

  const handleFontSizeChange = (_event, newValue) => {
    changeFontSize(newValue);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickSettings}
        sx={{
          margin: 2,
          fontWeight: 'bold',
          position: 'relative',
          color: 'inherit',
          '&:after': {
            content: '""',
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: '2px',
            background: 'currentColor',
            backgroundColor: 'white',
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 250ms ease-in',
          },
          '&:hover:after': {
            transform: 'scaleX(1)',
          },
        }}
      >
        Settings
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <WideMenuItem>
          <Typography variant="body1" sx={{ paddingRight: '1rem' }}>
            {constant.settings.text_size}
          </Typography>
          <Slider value={fontSize} onChange={handleFontSizeChange} aria-labelledby="text-size-slider" min={10} max={30} />
        </WideMenuItem>
        <WideMenuItem>
          <Typography variant="body1" className="mr-2">
            {constant.settings.dark_mode}
          </Typography>
          <Switch checked={darkMode} onChange={toggleDarkMode} name="darkMode" color="primary" />
        </WideMenuItem>
      </Menu>
    </>
  );
};

export default Settings;
