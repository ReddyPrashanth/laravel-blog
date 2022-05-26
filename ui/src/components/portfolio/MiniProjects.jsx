import React, { useState } from 'react';

const MiniProjects = () => {
    const [repos] = useState([
        {
            name: 'NestJS Microservices',
            description: 'Microservices built by using NestJS. It contains various services like api gateway, mail service, user management service and a store service for managing product inventory. This entire project follows CI/CD approach using docker, ansible and github workflows.',
            url: 'https://github.com/ReddyPrashanth/nestjs-microservices'
        },
        {
            name: 'Microservices Admin Dashboard',
            description: 'Admin Interface built by React JS. It provides an intuitive interface to manage users and products. It uses redux for state management across multiple UI components.',
            url: 'https://github.com/ReddyPrashanth/admin-dashboard'
        },
        {
            name: 'Django Blog Application',
            description: 'This is a blog application build by django framework. This site is built by using django, tailwind css and alpine js. Current website is a live version of this project.',
            url: 'https://github.com/ReddyPrashanth/django-project'
        },
        {
            name: 'Configuration Mgmt Using Ansible Roles',
            description: 'This repository provides configuration management for jenkins and nginx on Linux/Debian distribution. It uses roles for each task to be executed on operating system.',
            url: 'https://github.com/ReddyPrashanth/ansible-roles'
        },
        {
            name: 'Laravel Cart Api',
            description: 'This is a simple ecommerce api to explore laravel 8 features. Laravel is a PHP based web framework.',
            url: 'https://github.com/ReddyPrashanth/shopping-cart'
        },
        {
            name: 'Vue JS Cart Client',
            description: 'An user interface for shopping cart Laravel API which allows users to add products to shopping cart and complete the purchase transaction.',
            url: 'https://github.com/ReddyPrashanth/shopping-cart-client'
        }
    ])
    return (
        <div className="container mx-auto py-5">
            <h4 className="text-slate-500 mb-4">MINI PROJECTS</h4>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {repos.map((repo, idx) => (
                    <a key={idx} href={repo.url} target="_blank" rel="noreferrer" className="border text-center p-2 rounded hover:bg-slate-50 hover:shadow-md">
                        <div className="flex items-center justify-center pb-2">
                            <svg className="h-10 w-10" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"/></svg>
                        </div>    
                        <p className="font-medium text-sm pb-2">{repo.name}</p>
                        <p className="text-xs leading-loose">{repo.description}</p>
                    </a>
                ))}
                <div className="flex items-center text-sm font-medium">
                    <a href="https://github.com/ReddyPrashanth?tab=repositories" target="_blank" rel='noreferrer' className="hover:underline text-teal-600 hover:text-teal-700">Github Repositories &raquo;</a>
                </div>
            </div>
        </div>
    )
}

export default MiniProjects;