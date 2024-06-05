import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ()=>{
    return (
        <header className='bg-purple-600 min-h-14 flex items-center'>
            <div className='w-full flex flex-col items-center gap-5 sm:justify-between overflow-x-hidden sm:flex-row'>
                <div className='sm:ml-10'>
                    <Link to="/"><h1>Website Name</h1></Link>
                </div>
                <nav>
                    <div className='flex flex-row items-center mx-10 justify-between gap-10 px-2 py-2'>
                        <Link to="/">Home</Link>
                        <Link to="/map">Map</Link>
                        <Link to="/settings">Settings</Link>
                        <h3 className='text-center sm:text-left'>Login/Register</h3>
                    
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;