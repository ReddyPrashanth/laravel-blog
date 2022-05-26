import React from 'react';
import Joi from 'joi';
import { connect } from 'react-redux';
import { deletePost, postCreateSuccess, postsRequestFailed } from '../../store/entities/posts';
import Button from '../shared/Button';
import Form from '../shared/Form';
import request from '../../store/http';
import { requestCompleted, requestInitiated } from '../../store/entities/loader';
import Title from '../shared/Title';
import Description from '../shared/Description';
import { sessionExpired } from '../../store/entities/auth';

class PostForm extends Form {
    state = {
        data: {
            title: '',
            description: '',
            gist: '',
            files: ''
        },
        errors: {}
    }

    schemaOptions = {
        title: Joi.string().required().max(255).label("Title"),
        description: Joi.string().required().label("Description"),
        gist: Joi.string().allow('').label("Gist"),
        files: Joi.any()
    }

    schema = Joi.object(this.schemaOptions);

    handleSubmit = async (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({
            errors: errors || {}
        });
        if(errors) return;
        const {title, description, gist, files} = this.state.data;
        const formData = new FormData()
        formData.append("files", files);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("gist", gist);
        const headers = {
            "Accept": "application/json",
            "Content-Type": "multipart/form-data"
        }
        this.props.requestInitiated();
        try{
            const response = await request("/api/posts", "post", formData, headers);
            this.props.postCreated(response.data.data);
            this.setState({
                data: {
                    title: '',
                    description: '',
                    files: ''
                }
            })
        }catch (error) {
            const {status, data} = error.response;
            if (status === 401 || status === 419) this.props.sessionExpired();
            else this.props.postCreatefailed(data.message);
        }
        this.props.requestCompleted();
    }

    handleClick = () => {
        const post = this.props.post;
        if(post) this.props.deletePost(post.id);
    }

    render() {
        const { post } = this.props;
        let content;
        if (post) {
            content = <div>
                        <Title title={post.title}/>
                        <Description description={post.description}/>
                        <Button text="Delete Post" styles="border text-gray-800 rounded px-2 py-1 text-sm font-medium hover:text-white hover:bg-red-600 hover:border-none" onClick={this.handleClick}/>
                    </div>
        } else {
            content = <form onSubmit={this.handleSubmit}>
                        <h2 className="font-semibold mb-4 text-teal-600">Create A Blog Post</h2>
                        {this.renderInput("title", "Post Title")}
                        {this.renderTextArea("description", "Post Description", "5")}
                        {this.renderInput("gist", "Publicly Accessible Gist Id")}
                        {this.renderFileInput("files", "Upload file")}
                        <div className="flex justify-between">
                            {this.renderButton("CREATE POST")}
                        </div>
                    </form>
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}

const mapDispatchToprops = (dispatch) => ({
    requestInitiated: () => dispatch({type: requestInitiated.type}),
    requestCompleted: () => dispatch({type: requestCompleted.type}),
    postCreated: (payload) => dispatch({type: postCreateSuccess.type, payload}),
    postCreatefailed: (message) => dispatch({type: postsRequestFailed.type, payload:message}),
    deletePost: (id) => dispatch(deletePost(id)),
    sessionExpired: () => dispatch({type: sessionExpired.type})
});

export default connect(null, mapDispatchToprops)(PostForm);