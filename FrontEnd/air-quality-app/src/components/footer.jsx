import contactInfo from './footerconfig';
import React from 'react';

const Footer = ()=>{
    return(
        <footer className='bg-orange-400 flex justify-center items-center min-h-30'>
            <div className='flex flex-col overflow-x-hidden sm:flex-row sm:gap-60'>
                <div className='flex flex-col gap-2 text-center px-2 py-2'>
                    <h3 className='font-bold'>Contact Us</h3>
                    <p className="text-gray-600 font-semibold">{contactInfo.address}</p>
                    <ul className='flex flex-col gap-2'>
                        <li>
                            <div className='items-center justify-center'>
                                <p>{contactInfo.email}</p>
                            </div>
                        </li>
                        <li>
                            <div className='items-center justify-center'>
                                <p>{contactInfo.phone}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='flex flex-col items-center gap-2 px-2 py-2'>
                    <h3 className='font-bold'>Find us</h3>
                    <a href={ contactInfo.mapLink }>Google maps link</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;