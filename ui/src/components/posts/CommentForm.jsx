import Form from '../shared/Form';
import Joi from 'joi';
import { addPostComment, clearPostCommentError, getCommentsError } from '../../store/entities/comments';
import { connect } from 'react-redux';
import TheAlert from '../shared/TheAlert';

class CommentForm extends Form {

    state = {
        data: {
            description: ''
        },
        errors: {}
    }

    schemaOptions = {
        description: Joi.string().required().label('Comment')
    }

    schema = Joi.object(this.schemaOptions);

    doSubmit = () => {
        const {postId} = this.props;
        this.props.addComment(postId, this.state.data);
        this.setState({
            data: {
                description: ''
            }
        });
    }

    render() {
        const {error} = this.props;
        return (
            <div>
                {error && <TheAlert message={error} actiontype={clearPostCommentError.type}/>}
                <form className='my-2' onSubmit={this.handleSubmit}>
                    {this.renderTextArea('description')}
                    {this.renderButton('Add Comment')}
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    error: getCommentsError(state)
});

const mapDispatchToProps = (dispatch) => ({
    addComment: (postId, data) => dispatch(addPostComment(postId, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);