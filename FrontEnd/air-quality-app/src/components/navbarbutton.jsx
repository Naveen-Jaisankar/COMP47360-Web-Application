import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NavbarButton ({to, children, ...props}) {
    return (
        <Button component={Link} to={to} sx={{
            margin: 2,
            position: "relative",
            '&:after': {
                content: '""',
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                height: "2px",
                background: "currentColor",

                backgroundColor: "white",
                transform: 'scaleX(0.5)'
            },

            
            

        }} {...props}>
            {children}
        </Button>
        
    );
}