import { configureStore } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import apiMiddleware from './middleware/api';
import reducer from './reducer';

const customStore = () => {
    return configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => [
            ...getDefaultMiddleware({
                serializableCheck: {
                    ignoreActions: [apiCallBegan.type]
                }
            }),
            apiMiddleware
        ]
    })
}

export default customStore;