import React from 'react';
import { NavLink } from 'react-router-dom';

const NavTab = ({tab}) => {
    return (
        <li key={tab.id} className='mr-2'>
            <NavLink to={tab.path} className={({isActive}) => `inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-teal-600 hover:border-teal-600 hover:cursor-pointer ${isActive ? "border-teal-600 text-teal-600" : ""}`}>
                {tab.title}
            </NavLink>
        </li>
    )
}

export default NavTab;