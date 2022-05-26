import React from 'react';
import portfolio from '../../resources/images/portfolio.jpg';

const TheCover = () => {
    return (
        <div className="bg-sky-50 mb-4">
            <div className="flex items-center mx-auto p-10">
                <div className="flex justify-center w-3/5">
                    <div>
                        <h2 className="mr-2 font-semibold text-4xl">Hello, I am Prashanth Sreepathi, a software engineer</h2>
                        <div className="mt-4">
                            <a href={`${process.env.REACT_APP_CDN_DOMAIN}/psreepathi-resume.pdf`} target="_blank" rel='noreferrer' className="p-2 bg-teal-500 text-white rounded">Download Resume</a>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center w-2/5">
                    <img className="ml-2 rounded-2xl h-96" src={portfolio} alt="portfolio"></img>
                </div>
            </div>
        </div>
    )
}

export default TheCover;