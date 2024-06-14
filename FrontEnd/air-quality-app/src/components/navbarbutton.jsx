import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NavbarButton ({to, children, ...props}) {
    return (
        <Button component={Link} to={to} sx={{
            margin: 2,
            display: "relative",
            '&:hover': {
                backgroundColor: "white",
            },

            
            

        }} {...props}>
            {children}
        </Button>
        
    );
}