import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import AirIcon from '@mui/icons-material/Air';

const Navbar = () => {
  return (
    <AppBar position='static' sx={{
        backgroundColor: '#0D1B2A',
        height: {
            xs:56,
            sm:64,
            md:72,
            lg:80
        }
    }}>
        <Toolbar sx= {{display: 'flex'}}>
            <IconButton edge="start" color='inherit' aria-label="logo" 
            sx=
            {{ display: 'flex',
                alignItems: 'center',
            }}>
                <AirIcon/>
            </IconButton>
            <Typography variant='h3' component='div'>Fair</Typography>
            <Box>
                <Link to="/">Home</Link>
                <Link to="/map">Map</Link>
                <Link to="/settings">Settings</Link>
                <Link to="/form">form</Link>
            </Box>

        </Toolbar>

    </AppBar>
   
  );
};

export default Navbar;

 {/* <nav>
      <div className="flex flex-row items-center mx-10 justify-between gap-10 px-2 py-2">
        <Link to="/">Home</Link>
        <Link to="/map">Map</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/form">form</Link>

        <h3 className="text-center sm:text-left">Login/Register</h3>
      </div>
    </nav> */}