import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import { requestCompleted, requestInitiated } from "./loader";

const slice = createSlice({
    name: 'comments',
    initialState: {
        data: [],
        error: null
    },
    reducers: {
        postCommentsReceived: (comments, action) => {
            comments.data = action.payload;
            comments.error = null;
        },
        postCommentAdded: (comments, action) => {
            comments.data.push(action.payload);
        },
        postCommentsRequestFailed: (comments, action) => {
            comments.error = action.payload;
        },
        clearPostCommentError: (comments, action) => {
            comments.error = null;
        }
    }
});

export const {
    postCommentsReceived,
    postCommentsRequestFailed,
    postCommentAdded,
    clearPostCommentError
} = slice.actions;
export default slice.reducer;

const commentsUrl = '/api/posts';

export const loadComments = (postId) => apiCallBegan({
    url: `${commentsUrl}/${postId}/comments`,
    method: 'get',
    onStart: requestInitiated.type,
    onSuccess: postCommentsReceived.type,
    onError: postCommentsRequestFailed.type,
    onComplete: requestCompleted.type
});

export const addPostComment = (postId, data) => apiCallBegan({
    url: `${commentsUrl}/${postId}/comments`,
    method: 'post',
    data,
    onStart: requestInitiated.type,
    onSuccess: postCommentAdded.type,
    onError: postCommentsRequestFailed.type,
    onComplete: requestCompleted.type
})

export const getComments = createSelector(
    state => state.entities.comments,
    comments => comments.data
);

export const getCommentsError = createSelector(
    state => state.entities.comments,
    comments => comments.error
);