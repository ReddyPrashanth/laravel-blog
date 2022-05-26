import { combineReducers } from "@reduxjs/toolkit";
import postsReducer from './posts';
import contentsReducer from './contents';
import loaderReducer from './loader';
import authReducer from './auth';

export default combineReducers({
    posts: postsReducer,
    contents: contentsReducer,
    loader: loaderReducer,
    auth: authReducer
});