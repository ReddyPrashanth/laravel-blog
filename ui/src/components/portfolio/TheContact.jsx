import Joi from 'joi';
import { connect } from 'react-redux';
import { clearContactUsError, contactUs, getContactUsError } from '../../store/entities/portfolio';
import Form from '../shared/Form';
import TheAlert from '../shared/TheAlert';

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
        this.props.sendEmail(this.state.data);
        this.setState({
            data: {
                name: '',
                email: '',
                message: ''
            }
        });
    }
    render() {
        const {error, success} = this.props;
        return (
            <div className='py-5 flex'>
                <div className='w-full lg:w-1/2'>
                    {error && <TheAlert message={error} actiontype={clearContactUsError.type}/>}
                    {success && <TheAlert message={success.message} actiontype={clearContactUsError.type}/>}
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

const mapDispatchToProps = (dispatch) => ({
    sendEmail: (payload) => dispatch(contactUs(payload)) 
});

const mapStateToProps = (state) => ({
    error: getContactUsError(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(TheContact);