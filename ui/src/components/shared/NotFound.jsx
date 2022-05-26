import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return ( 
        <div className="h-screen sm:flex items-center justify-around p-8 bg-red-500 text-white">
            <div className="sm:text-left text-center">
                <h3 className="text-xl font-bold mb-4">Oops! Looks like you are lost.</h3>
                <p className="text-sm">The page you're looking does not exist in our domain.</p>
                <p className="text-sm sm:mb-8 mb-4">Let's get you on track...</p>
                <Link to="/" className="bg-white text-black text-sm rounded font-bold p-2">HOME PAGE</Link>
            </div>
            <div className="sm:text-left text-center mt-4 sm:mt-0">
                <h4 className="md:text-9xl text-7xl font-bold">404</h4>
                <p className="text-xl font-bold">NOT FOUND</p>
            </div>
        </div>
    );
}
 
export default NotFound;