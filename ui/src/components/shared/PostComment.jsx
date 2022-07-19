import React from 'react';
import DisLike from '../../icons/DisLike';
import TheLike from '../../icons/TheLike';
import TheProfile from '../../icons/TheProfile';
import TrashCan from '../../icons/TrashCan';

const PostComment = ({comment, user}) => {
    return (
        <div className="mb-4 flex">
            <div className='mr-2'>
                <TheProfile classes="w-12 h-12 rounded-full border"/>
            </div>
            <div>
                <p className='font-medium text-teal-700'>{comment.user.name} <span className='font-normal text-gray-600'>{comment.created_at}</span></p>
                <p className='mt-1'>{comment.description}</p>
                <div className='mt-1 text-xxs flex items-center space-x-2'>
                    <TheLike classes="w-3 h-3 hover:cursor-pointer"/>
                    <DisLike classes="w-3 h-3 hover:cursor-pointer"/>
                    {comment.user.id === user.id && <TrashCan classes="w-3 h-3 hover:cursor-pointer"/>}
                    <button className='hover:bg-gray-200 px-1 hover:rounded'>REPLY</button>
                </div>
            </div>
        </div>
    )
}

export default PostComment;