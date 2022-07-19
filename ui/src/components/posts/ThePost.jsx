import React from 'react';
import { connect } from 'react-redux';
import WithRouter from '../../router/WithRouter';
import { getAuthenticatedUser } from '../../store/entities/auth';
import { getComments, loadComments } from '../../store/entities/comments';
import { fetchPostDetail, getPostDetail, getTopRatedPosts } from '../../store/entities/posts';
import PostComments from './PostComments';
import PostDetail from './PostDetail';
import TopRated from './TopRated';

class ThePost extends React.Component {

    componentDidMount() {
        const id = this.props.params.id;
        this.props.fetchPostDetail(id);
        this.props.fetchPostComments(id);
    }

    componentDidUpdate(prevProps) {
        const id = this.props.params.id;
        if(prevProps.params.id !== id) {
            this.props.fetchPostDetail(id);
            this.props.fetchPostComments(id);
        }
            
    }

    render() {
        const {postDetail, topRated, comments, user} = this.props;
        return (
            <div>
                <div className='lg:flex'>
                    <div className='lg:w-2/3 lg:mr-4'>
                        {postDetail && <PostDetail postDetail={postDetail} />}
                        {!postDetail && <p>Post not found.</p>}
                    </div>
                    <div className='lg:w-1/3 hidden lg:block'>
                        <TopRated posts={topRated}/>
                    </div>
                </div>
                {postDetail && <PostComments user={user} postId={postDetail.id} comments={comments}/>}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchPostDetail: (id) => dispatch(fetchPostDetail(id)),
    fetchPostComments: (id) => dispatch(loadComments(id))
});

const mapStateToProps = (state) => ({
    postDetail: getPostDetail(state),
    topRated: getTopRatedPosts(state),
    comments: getComments(state),
    user: getAuthenticatedUser(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(ThePost));