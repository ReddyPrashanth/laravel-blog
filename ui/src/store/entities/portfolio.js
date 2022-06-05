import { createSelector, createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../api';
import { requestCompleted, requestInitiated } from "./loader";

const slice = createSlice({
    name: 'portfolio',
    initialState: {
        error: null,
    },
    reducers: {
        contactUsEmailSent: (portfolio, action) => {
            portfolio.error = null;
            alert(action.payload.message);
        },
        contactUsEmailFailed: (portfolio, action) => {
            portfolio.error = 'Failed to send message. Please try again later.';
        },
        clearContactUsError: (portfolio, action) => {
            portfolio.error = null;
        }
    }
});

export const {
    contactUsEmailSent,
    contactUsEmailFailed,
    clearContactUsError
} = slice.actions;
export default slice.reducer;

export const contactUs = (payload) => apiCallBegan({
    url: '/api/contact/us',
    method: 'post',
    data: payload,
    onStart: requestInitiated.type,
    onSuccess: contactUsEmailSent.type,
    onError: contactUsEmailFailed.type,
    onComplete: requestCompleted.type
});

export const getContactUsError = createSelector(
    state => state.entities.portfolio,
    portfolio => portfolio.error
);