import React from 'react';
import PostComment from '../shared/PostComment';
import Title from '../shared/Title';
import CommentForm from './CommentForm';

const PostComments = ({comments, postId, user}) => {
    return (
        <div>
            <Title title="Comments"/>
            <CommentForm  postId={postId}/>
            <hr />
            <div className='mt-4 text-xs'>
                {comments.map((c, idx) => (
                   <PostComment key={idx} comment={c} user={user}/>
                ))}
            </div>
        </div>
    )
}

export default PostComments;