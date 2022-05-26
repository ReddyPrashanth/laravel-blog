import Joi from 'joi';
import Form from '../shared/Form';

class TheContact extends Form {

    state = {
        data: {
            name: '',
            email: '',
            message: ''
        },
        errors: {}
    }

    schemaOptions = {
        name: Joi.string().required(),
        email: Joi.string().required().email({tlds:{allow: false}}).label("Email"),
        message: Joi.string().required()
    }

    schema = Joi.object(this.schemaOptions);

    doSubmit = () => {
        console.log(this.state);
    }
    render() {
        return (
            <div className='py-5 flex'>
                <div className='w-full lg:w-1/2'>
                    <h4 className='text-slate-500 mb-4'>EMAIL CONTACT</h4>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput('name', 'Full Name')}
                        {this.renderInput('email', "Email Address")}
                        {this.renderTextArea('message', 'Enter Your Message Here')}
                        {this.renderButton('Send Message')}
                    </form>
                </div>
            </div>
        )
    }
}

export default TheContact;