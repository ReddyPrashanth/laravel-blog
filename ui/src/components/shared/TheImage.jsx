import React from 'react';

const TheImage = ({title, file}) => {
    const domain = process.env.REACT_APP_CDN_DOMAIN;
    const src = `${domain}/${file}`;
    return (
        <div className='relative flex justify-center my-4'>
            <img 
                src={src} 
                onError={({currentTarget: input}) => {
                    input.onerror = null;
                    input.src="http://ui.blog.com:3000/not-found.jpg";
                }}
                alt={title}
                title={title}
                className='object-scale-down h-128 cursor-pointer object-center rounded'></img>
        </div>    
    )
}

export default TheImage;