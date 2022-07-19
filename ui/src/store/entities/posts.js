import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import { requestCompleted, requestInitiated } from "./loader";


const slice = createSlice({
    name: 'posts',
    initialState: {
        data: [],
        post: null,
        error: null,
        postDetail: null,
    },
    reducers: {
        topPostsReceived: (posts, action) => {
            posts.data = action.payload;
        },
        topPostsRequestFailed: (posts, action) => {
            posts.error = action.payload;
        },
        postCreateSuccess: (posts, action) => {
            posts.post = action.payload;
        },
        postsRequestFailed: (posts, action) => {
            posts.error = action.payload;
        },
        postDeleteSuccess: (posts, action) => {
            posts.post = null;
        },
        resetPostOnSuccess: (posts, action) => {
            posts.post = null;
        },
        postDetailSuccess: (posts, action) => {
            posts.postDetail = action.payload;
        },
        postDetailFailed: (posts, action) => {
            posts.postDetail = null;
            posts.error = action.payload;
        }
    }
});

export const {
    topPostsReceived,
    topPostsRequestFailed,
    postCreateSuccess,
    postDeleteSuccess,
    postsRequestFailed,
    resetPostOnSuccess,
    postDetailSuccess,
    postDetailFailed
} = slice.actions;

export default slice.reducer;

const url = '/api/posts';

export const loadPosts = () => apiCallBegan({
    url,
    method: 'get',
    onStart: requestInitiated.type,
    onSuccess: topPostsReceived.type,
    onError: topPostsRequestFailed.type,
    onComplete: requestCompleted.type
});

export const deletePost = (id) => apiCallBegan({
    url: `${url}/${id}`,
    method: 'delete',
    onStart: requestInitiated.type,
    onSuccess: postDeleteSuccess.type,
    onError: postsRequestFailed.type,
    onComplete: requestCompleted.type
});

export const fetchPostDetail = (id) => apiCallBegan({
    url: `${url}/${id}`,
    method: 'get',
    onStart: requestInitiated.type,
    onSuccess: postDetailSuccess.type,
    onError: postDetailFailed.type,
    onComplete: requestCompleted.type
})

export const getPosts = createSelector(
    state => state.entities.posts,
    posts => posts.data
);

export const getPost = createSelector(
    state => state.entities.posts,
    posts => posts.post
);

export const getPostDetail = createSelector(
    state => state.entities.posts,
    posts => posts.postDetail
);

export const getTopRatedPosts = createSelector(
    state => state.entities.posts,
    posts => posts.data.slice(0,4)
)