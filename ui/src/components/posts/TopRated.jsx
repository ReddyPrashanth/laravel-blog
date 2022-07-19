import React from 'react';
import { Link } from 'react-router-dom';
import { truncate } from '../../utils/pipes';
import Title from '../shared/Title';

const TopRated = ({posts}) => {
    return (
        <div className='border rounded p-2'>
            <Title title='Top Rated Posts'/>
            {posts.map(p => (
                <div className='text-xs mt-2' key={p.id}>
                    <Link to={`/posts/${p.id}`}>
                        <h4 className='font-medium text-teal-700 hover:underline mb-1'>{truncate(60, p.title)}</h4>
                    </Link>
                    <p>{truncate(100, p.description)}</p>
                </div>
            ))}
        </div>
    )
}

export default TopRated;