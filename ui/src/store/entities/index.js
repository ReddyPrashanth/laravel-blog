import { combineReducers } from "@reduxjs/toolkit";
import postsReducer from './posts';
import contentsReducer from './contents';
import loaderReducer from './loader';
import authReducer from './auth';
import portfolioReducer from './portfolio';
import commentsReducer from './comments';

export default combineReducers({
    posts: postsReducer,
    contents: contentsReducer,
    loader: loaderReducer,
    auth: authReducer,
    portfolio: portfolioReducer,
    comments: commentsReducer
});