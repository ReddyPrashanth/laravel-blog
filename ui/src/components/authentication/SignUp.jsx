import React from 'react';
import Joi from 'joi';
import Form from '../shared/Form';
import FormTitle from '../shared/FormTitle';

class SignUp extends Form {
    state = {
        data: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: ""
        },
        errors: {}
    }

    schemaOptions = {
        name: Joi.string().required().label("Name"),
        email: Joi.string().required().email({tlds:{allow: false}}).label("Email"),
        phone: Joi.string().required().label("Phone"),
        password: Joi.string().required().label("Password"),
        confirmPassword: Joi.string()
                            .equal(Joi.ref("password"))
                            .messages({
                                'any.only': 'Passwod does not match'
                            })
                            .label("Confirm Password")
                            .required()
    }

    schema = Joi.object(this.schemaOptions);

    doSubmit = () => {
        console.log(this.state);
    }

    render() {
        return (
            <div className="flex justify-center items-center h-screen-90">
                <div className="border py-2 bg-white rounded shadow p-4 w-2/3 md:w-1/2 lg:w-1/3">
                    <FormTitle title="Sign Up Form"/>
                    <form onSubmit={this.handleSubmit}>
                        <div className="mr-2">
                            {this.renderInput("name", "Full Name")}
                            {this.renderInput("email", "Email", "email")}
                            {this.renderInput("phone", "Mobile Phone", "tel", "15")}
                            {this.renderInput("password", "Password", "password")}
                            {this.renderInput("confirmPassword", "Confirm Password", "password")}
                        </div>
                        <div className="flex justify-between mt-4">
                        {this.renderButton("SIGN UP")}
                        {this.renderLink("Already have an account? Sign In")}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignUp;