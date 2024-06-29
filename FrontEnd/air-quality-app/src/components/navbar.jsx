import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import AirIcon from '@mui/icons-material/Air';
import NavbarButton from "./navbarbutton";
import navbarHeights from './navbarheights';

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
                <NavbarButton to="/">Home</NavbarButton>
                <NavbarButton to="/map">Map</NavbarButton>
                <NavbarButton to="/settings">Settings</NavbarButton>
                <NavbarButton to="/form">Form</NavbarButton>
                <NavbarButton to="/register">Login/Register</NavbarButton>
            </Box>

        </Toolbar>

    </AppBar>
   
  );
};

export default Navbar;