import React from 'react';
import Joi from 'joi';
import { Link } from 'react-router-dom';
import FileInput from './FileInput';
import Input from './Input';
import TextArea from './TextArea';

class Form extends React.Component {

    validate = () => {
        const options = { abortEarly: false };
        const {error} = this.schema.validate(this.state.data, options);
        if(!error) return null;
        const errors = {};
        for(let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    }

    validateProperty = ({name, value}) => {
        if(name === 'confirmPassword') return null;
        const property = {[name]: value};
        const schema = Joi.object({[name]: this.schemaOptions[name]})
        const {error} = schema.validate(property);
        return error ? error.details[0].message : null;
    }

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({
            errors: errors || {}
        });
        if(errors) return;
        this.doSubmit();
    }

    handleChange = ({currentTarget: input}) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if(errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({
            data,
            errors
        });
    }

    handleFileInputChange = ({currentTarget: target}) => {
        const file = target.files[0];
        const data = {...this.state.data};
        data[target.name] = file;
        this.setState({
            data
        });
    }

    renderButton(text) {
        return <button className="
            bg-teal-500
            hover:bg-teal-700
            text-white
            font-semibold
            text-xs
            mr-1
            md:text-sm
            md:px-2
            p-1
            rounded
        ">
            {text}
        </button>
    }

    renderLink(linkText, to="/") {
        return <Link
            to={to}
            className="
                text-teal-600
                text-xs
                md:text-xs
                font-semibold
                underline
                hover:text-teal-700
            "
        >
            {linkText}
        </Link>
    }

    renderInput(name, label, type="input", maxLength="100") {
        const { data, errors } = this.state;
        return <Input 
                    name={name}
                    label={label}
                    type={type}
                    value={data[name]}
                    placeholder={label}
                    maxLength={maxLength}
                    onChange={this.handleChange}
                    error={errors[name]}
                />
    }

    renderFileInput(name, label) {
        return <FileInput 
                    name={name}
                    label={label}
                    type="file"
                    onChange={this.handleFileInputChange}
                />
    }

    renderTextArea(name, label, rows="3") {
        const { data, errors } = this.state;
        return <TextArea 
                    name={name}
                    label={label}
                    rows={rows}
                    value={data[name]}
                    placeholder={label}
                    onChange={this.handleChange}
                    error={errors[name]}
                />
    }
}

export default Form;