import React from 'react';
import { connect } from 'react-redux'
import Button from '../shared/Button';
import request from '../../store/http';
import { sessionExpired } from '../../store/entities/auth';


class TestAuth extends React.Component {

    handleBtnClick = async () => {
        console.log("Button clicked");
        try{
            const payload = {
                ping: "pong"
            }
            await request("/sanctum/csrf-cookie", "get");
            const res = await request("/api/auth", "post", payload);
            console.log(res);
        }catch(error) {
            const {status} = error.response;
            if(status === 401 || status === 419) this.props.sessionExpired();
        }
    }

    render() {
        return (
            <Button type="button" onClick={this.handleBtnClick} />
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    sessionExpired: () => dispatch({type: sessionExpired.type})
})

export default connect(null, mapDispatchToProps)(TestAuth);