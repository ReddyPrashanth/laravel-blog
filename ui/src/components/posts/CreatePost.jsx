import React from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../store/entities/posts';
import ContentForm from './ContentForm';
import PostForm from './PostForm';

class CreatePost extends React.Component {
    render() {
        const {post} = this.props;
        return (
            <div className="w-full lg:w-1/2 mx-auto">
                <PostForm post={post}/>
                <br />
                {post && <ContentForm post={post}/>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    post: getPost(state)
});

export default connect(mapStateToProps, null)(CreatePost);