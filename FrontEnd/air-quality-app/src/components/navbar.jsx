import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import AirIcon from '@mui/icons-material/Air';
import NavbarButton from "./navbarbutton";
import navbarHeights from './navbarheights';
import constants from './../constant';

const Navbar = () => {
  return (
    <AppBar position='fixed' sx={{
        backgroundColor: '#0D1B2A',
        height: {
          xs: navbarHeights.xs,
          sm: navbarHeights.sm,
          md: navbarHeights.md,
          lg: navbarHeights.lg
        },
        zIndex: (theme) => theme.zIndex.drawer + 1 
    }}>
        <Toolbar sx= {{display: 'flex'}}>
            <IconButton edge="start" color='inherit' aria-label="logo" 
            sx=
            {{ 
                alignItems: 'center',
            }}>
                <AirIcon/>
            </IconButton>
            <Typography variant='h3' component='div' 
            sx=
            {{flexGrow: 1,
               display: {xs:'none',md: 'flex'}  
            }}>Fair</Typography>
            <Box>
                <NavbarButton to="/">{constants.general.home}</NavbarButton>
                <NavbarButton to="/map">{constants.general.map}</NavbarButton>
                <NavbarButton to="/settings">{constants.general.settings}</NavbarButton>
                <NavbarButton to="/form">{constants.general.form}</NavbarButton>
                <NavbarButton to="/register">{constants.general.login_register}</NavbarButton>
            </Box>

        </Toolbar>

    </AppBar>
   
  );
};

export default Navbar;