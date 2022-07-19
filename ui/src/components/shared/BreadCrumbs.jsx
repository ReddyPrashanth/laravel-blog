import React from 'react';
import WithRouter from '../../router/WithRouter';
import routes from '../../router/Routes';
import { Link, matchPath } from 'react-router-dom';

const BreadCrumbs = ({location}) => {
    const crumbs = [];
    routes.forEach((route) => {
        const match = matchPath(
            {path: route.path, end: false},
            location.pathname
        );
        if(match) crumbs.push(route);
    });
    let template = null;
    if (crumbs.length > 1) {
        const crumbsTemp = crumbs.map((c, idx) => {
            return idx < crumbs.length -1
                    ? <Link to={c.path} key={idx} className='inline-flex items-center font-medium text-gray-700 hover:text-teal-700'>
                        {idx !== 0 && <svg className="w-6 h-6 text-gray-400 mr-1 md:mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>}
                        {c.name}
                    </Link>
                    : <li key={idx} className='inline-flex items-center font-medium text-gray-500'>
                        {idx !== 0 && <svg className="w-4 h-4 text-gray-400 mr-1 md:mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>}
                        {c.name}
                    </li>
        });
        template = <div className='flex border px-2 py-1 mb-4 rounded' aria-label='breadcrumb'>
            <ol className='inline-flex items-center space-x-1 md:space-x-3 text-xs'>
                {crumbsTemp}
            </ol>
        </div>
    }
    return template
}

export default WithRouter(BreadCrumbs);