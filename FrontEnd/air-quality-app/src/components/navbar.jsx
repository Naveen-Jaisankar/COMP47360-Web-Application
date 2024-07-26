import { useState, useContext} from "react";
import { AppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem} from "@mui/material";
import AirIcon from '@mui/icons-material/Air';
import {useNavigate} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
 
import NavbarButton from "./navbarbutton";
import navbarHeights from './navbarheights';
import constants from './../constant';
import { AuthContext } from "../context/AuthContext";


const Navbar = () => {
  const navigate = useNavigate();

  const [anchorNav, setAnchorNav] = useState(null);

  const {token, logout} = useContext(AuthContext);

  const handleOnClick = ()=>{
    navigate('/');
  };

  const handleMenuOpen = (event) =>{
    setAnchorNav(event.currentTarget);
  };

  const handleCloseMenu = () =>{
    setAnchorNav(null);
  };

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
            }}
            onClick={handleOnClick}>
                <AirIcon/>
            </IconButton>
            <Typography variant='h3' component='div' 
            sx=
            {{flexGrow: 1,
               display: {md: 'flex'}  
            }}>Fair</Typography>
            <Box  sx={{ display: { xs: 'none', md: 'block' }}}>
                <NavbarButton to="/">{constants.general.home}</NavbarButton>
                <NavbarButton to="/map">{constants.general.map}</NavbarButton>
                <NavbarButton to="/settings">{constants.general.settings}</NavbarButton>
                <NavbarButton to="/user">{constants.general.user_dash}</NavbarButton>
                <NavbarButton to="/login">{constants.general.login_register}</NavbarButton>
            </Box>

          <IconButton edge="end" color="inherit" aria-label="menu" size="large"
           onClick={handleMenuOpen} sx={{ display: { xs: 'block', md: 'none' } }}>
            <MenuIcon/>
          </IconButton>

          <Menu anchorEl={anchorNav} open={Boolean(anchorNav)} onClose={handleCloseMenu}> 
            <MenuItem onClick={() => { handleCloseMenu(); navigate('/'); }}>{constants.general.home}</MenuItem>
            <MenuItem onClick={() => { handleCloseMenu(); navigate('/map'); }}>{constants.general.map}</MenuItem>
            <MenuItem onClick={() => { handleCloseMenu(); navigate('/settings'); }}>{constants.general.settings}</MenuItem>
            <MenuItem onClick={() => { handleCloseMenu(); navigate('/user'); }}>{constants.general.user_dash}</MenuItem>
            <MenuItem onClick={() => { handleCloseMenu(); navigate('/register'); }}>{constants.general.login_register}</MenuItem>
          </Menu>

        </Toolbar>
    </AppBar>
   
  );
};

export default Navbar;