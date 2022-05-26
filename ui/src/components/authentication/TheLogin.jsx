import React from 'react';
import Joi from 'joi';
import { connect } from 'react-redux';
import request from '../../store/http';
import WithRouter from '../../router/WithRouter';
import Form from '../shared/Form';
import FormTitle from '../shared/FormTitle';
import { getSignInError, resetAuthError, signInFailed, signInSucceded } from '../../store/entities/auth';
import {requestInitiated, requestCompleted} from '../../store/entities/loader';
import TheAlert from '../shared/TheAlert';

class TheLogin extends Form {
    state = {
        data: {
            email: "",
            password: ""
        },
        errors: {}
    }

    schemaOptions = {
        email: Joi.string().required().email({tlds:{allow: false}}).label("Email"),
        password: Joi.string().required().label("Password")
    }

    schema = Joi.object(this.schemaOptions);

    doSubmit = async () => {
        const data = this.state.data;
        this.props.requestInitiated();
        try{
            await request("/sanctum/csrf-cookie", "get");
            const response = await request("/login", "post", data)
            this.props.loggedIn(response.data);
            const { location, navigate } = this.props;
            const origin = location.state?.from?.pathname || "/";
            navigate(origin);
        }catch(error) {
            const { data } = error.response;
            this.props.signInFailed(data.message);
        }
        this.props.requestCompleted();
    }

    render() {
        const {error} = this.props;
        return (
            <div className="flex justify-center items-center h-screen-90">
                <div className="border py-2 bg-white rounded shadow p-4 w-2/3 md:w-1/2 lg:w-1/3">
                    {error && <TheAlert message={error} color="red" actiontype={resetAuthError.type}/>}
                    <FormTitle title="Login Form"/>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput("email", "Email", "email")}
                        {this.renderInput("password", "Password", "password")}
                        <div className="flex justify-between">
                        {this.renderButton("SIGN IN")}
                        {this.renderLink("Forgot Password ?")}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    error: getSignInError(state)
});

const mapDispatchToProps = (dispatch) => ({
    requestInitiated: () => dispatch({type: requestInitiated.type}),
    requestCompleted: () => dispatch({type: requestCompleted.type}),
    loggedIn: (payload) => dispatch({type: signInSucceded.type, payload}),
    signInFailed: (payload) => dispatch({type: signInFailed.type, payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(TheLogin));