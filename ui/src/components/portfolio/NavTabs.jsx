import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavTab from '../shared/NavTab';
import TheAbout from './TheAbout';
import TheExperience from './TheExperience';
import MiniProjects from './MiniProjects';
import TheContact from './TheContact';

const NavTabs = () => {
    const [tabs] = useState([
        {
            id: 0,
            title: 'About',
            path: '/portfolio/about' 
        },
        {
            id: 1,
            title: 'Experience',
            path: '/portfolio/experience' 
        },
        {
            id: 2,
            title: 'Mini Projects',
            path: '/portfolio/mini-projects' 
        },
        {
            id: 3,
            title: 'Contact',
            path: '/portfolio/contact' 
        }
    ]);

    return (
        <div>
            <div className="font-medium text-center text-gray-500 border-b border-gray-200">
                <ul className='flex flex-wrap -mb-px'>
                    {tabs.map((t) => (
                        <NavTab tab={t} key={t.id}/>
                    ))}
                </ul>
            </div>
            <br />
            <div>
                <Routes>
                    <Route path='about' element={<TheAbout />}/>
                    <Route path='experience' element={<TheExperience />}/>
                    <Route path='mini-projects' element={<MiniProjects />}/>
                    <Route path='contact' element={<TheContact />}/>
                </Routes>
            </div>
        </div>
    )
}

export default NavTabs;