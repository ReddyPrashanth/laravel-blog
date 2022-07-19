import * as actions from '../api';
import { sessionExpired } from '../entities/auth';
import request from '../http';

const api = ({ dispatch }) => next => async action => {
    if(action.type !== actions.apiCallBegan.type) return next(action);

    const {url, method, data, headers, onStart, onSuccess, onError, onComplete} = action.payload;

    if(onStart) dispatch({type: onStart});

    next(action);

    try {
        const response = await request(url, method, data, headers);
        const payload = response.data.data;
        dispatch(actions.apiCallSuccess(payload));
        if(onSuccess) dispatch({type: onSuccess, payload});
    } catch (error) {
        const {data, status} = error.response;
        dispatch(actions.apiCallFailed(data.message));
        if (status === 401 || status === 419) {
            dispatch({type: sessionExpired.type});
        }else {
            if(onError) dispatch({type: onError, payload: data.message});
        }
    }
    if(onComplete) dispatch({type: onComplete});
}

export default api;