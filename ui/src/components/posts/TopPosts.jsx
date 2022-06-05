import React from 'react';
import { useSelector } from 'react-redux';
import { getPosts } from '../../store/entities/posts';
import PostCard from '../shared/PostCard';

const TopPosts = () => {
    const posts = useSelector(state => getPosts(state));
    return (
        <div>
            {posts.map(p => 
                <PostCard key={p.id}
                    post={p} 
                />
            )}
        </div>
    )
}

export default TopPosts;