import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ()=>{
    return (



                <nav>
                    <div className='flex flex-row items-center mx-10 justify-between gap-10 px-2 py-2'>
                        <Link to="/">Home</Link>
                        <Link to="/map">Map</Link>
                        <Link to="/settings">Settings</Link>
                        <Link to="/form">form</Link>
                        
                        <h3 className='text-center sm:text-left'>Login/Register</h3>
                    
                    </div>
                </nav>
           
    );
};

export default Navbar;