import React from 'react';
import { connect } from 'react-redux';
import WithRouter from '../../router/WithRouter';
import { fetchPostDetail, getPostDetail } from '../../store/entities/posts';
import PostDetail from './PostDetail';

class ThePost extends React.Component {

    componentDidMount() {
        const {params} = this.props;
        this.props.fetchPostDetail(params.id);
    }

    render() {
        const {postDetail} = this.props;
        return (
            <div>
                {postDetail && <PostDetail postDetail={postDetail} />}
                {!postDetail && <p>Post not found.</p>}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchPostDetail: (id) => dispatch(fetchPostDetail(id))
})

const mapStateToProps = (state) => ({
    postDetail: getPostDetail(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(ThePost));