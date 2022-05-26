import React from 'react';
import request from '../../store/http';
import { connect } from 'react-redux';
import { contentsCreateSuccess, contentsRequestFailed } from '../../store/entities/contents';
import Button from '../shared/Button';
import Form from '../shared/Form';
import Input from '../shared/Input';
import TextArea from '../shared/TextArea';
import { requestCompleted, requestInitiated } from '../../store/entities/loader';
import { resetPostOnSuccess } from '../../store/entities/posts';
import { sessionExpired } from '../../store/entities/auth';

class ContentForm extends Form {

    subTitleLabel = "Sub Title";

    contentLabel = "Paragraph Content";
    
    listLabel = "Add Bullet Point";

    state = {
        data: []
    }

    handleChange = (cIndex, bIndex, lIndex, {currentTarget: input}) => {
        const data = [...this.state.data];
        const isContent = cIndex != null && bIndex != null;
        if(isContent && lIndex != null){
            data[cIndex].body[bIndex].list_items.splice(lIndex, 1, input.value);
        }else if(isContent){
            data[cIndex].body[bIndex][input.name] = input.value;
        }else{
            data[cIndex][input.name] = input.value;
        }
        this.setState({
            data
        });
    }

    addParagraph = (cIndex) => {
        const data = [...this.state.data];
        data[cIndex].body.push({
            content: "",
            list_items: [],
        });
        this.setState({
            data
        })
    }

    addContent = () => {
        const data = [...this.state.data];
        data.push({
            sub_title: "",
            body: [
                {
                    content: "",
                    list_items: [],
                }
            ]
        });
        this.setState({
            data
        })
    }

    addListItem = (cIndex, bIndex) => {
        const data = [...this.state.data];
        data[cIndex].body[bIndex].list_items.push("");
        this.setState({
            data
        })
    }


    deleteContent = (cIndex) => {
        const data = [...this.state.data];
        data.splice(cIndex, 1);
        this.setState({
            data
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if(this.state.data.length > 0){
            const {post} = this.props;
            this.props.requestInitiated();
            try{
                const data = this.state.data;
                const response = await request(`/api/posts/${post.id}/contents`, 'post', {data});
                this.props.createContents(response.data.data);
                this.props.resetPost();
                this.setState({
                    data: []
                });
            } catch (error) {
                const {status, data} = error.response;
                if (status === 401 || status === 419) this.props.sessionExpired();
                else this.props.createContentsFailed(data.message);
            }
            this.props.requestCompleted();
        }
    }

    render() {
        const {data} = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                {data.map((c, cInd) => <div key={cInd} className="mb-4 border rounded p-2">
                    <Input 
                        name="sub_title"
                        label={this.subTitleLabel}
                        type="input"
                        value={c["sub_title"]}
                        placeholder={this.subTitleLabel}
                        onChange={(e) => this.handleChange(cInd, null, null, e)}
                    />
                    {c.body.map((b, bInd) => <div key={bInd}>
                    <TextArea 
                        name="content"
                        label={this.contentLabel}
                        rows="3"
                        value={b["content"]}
                        placeholder={this.contentLabel}
                        onChange={(e) => this.handleChange(cInd, bInd, null, e)}
                    />
                    {b.list_items.map((l, lInd) => <input 
                                name="list_items"
                                key={lInd}
                                value={l}
                                placeholder={this.listLabel}
                                className="
                                    border
                                    rounded
                                    px-2
                                    py-1
                                    w-full
                                    mb-2
                                "
                                onChange={(e) => this.handleChange(cInd, bInd, lInd, e)}
                            />)}
                        <Button 
                            text="Add Bullet Point" 
                            styles="text-gray-900 mb-2 border rounded px-2 py-1 text-sm font-medium"
                            onClick={() => this.addListItem(cInd, bInd)}
                        />
                    </div>)}
                    <Button 
                        text="Add Paragraph" 
                        styles="text-gray-900 mr-2 border rounded px-2 py-1 text-sm font-medium"
                        onClick={() => this.addParagraph(cInd)}
                    />
                    <Button 
                        text="Delete Section" 
                        onClick={() => this.deleteContent(cInd)}
                    />
                </div>)}
                <Button text="Add Post Content" styles="border rounded px-2 py-1 text-sm font-medium mr-2" onClick={this.addContent}/>
                <Button type="submit" text="Save Post Content" styles="text-white bg-teal-700 rounded px-2 py-1 text-sm font-medium"/>
            </form>
        )
    }
}

const mapDispatchToprops = (dispatch) => ({
    requestInitiated: () => dispatch({type: requestInitiated.type}),
    requestCompleted: () => dispatch({type: requestCompleted.type}),
    resetPost: () => dispatch({type: resetPostOnSuccess.type}),
    createContents: (payload) => dispatch({type: contentsCreateSuccess.type, payload}),
    createContentsFailed: (message) => dispatch({type: contentsRequestFailed.type, payload: message}), 
    sessionExpired: () => dispatch({type: sessionExpired.type})
});

export default connect(null, mapDispatchToprops)(ContentForm);