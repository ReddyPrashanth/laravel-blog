import React from 'react';
import { Link } from 'react-router-dom';
import Description from '../shared/Description';
import Title from '../shared/Title';
import DateDisplay from '../shared/DateDisplay';

const PostCard = ({post}) => {
    return (
        <div className="text-sm border p-2 rounded mt-4">
            <Title title={post.title}/>
            <Description description={post.description}/>
            <DateDisplay displaytext="Created On" date={post.created_at}/>
            <Link to={`/posts/${post.id}`}>
                <button className='text-gray-700 hover:underline'>Read More &gt;&gt;</button>
            </Link>
        </div>
    )
}

export default PostCard;