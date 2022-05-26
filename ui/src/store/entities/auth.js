import { createSelector, createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from "../api";
import { requestCompleted, requestInitiated } from "./loader";

const userKey = "user";
const userData = sessionStorage.getItem(userKey);
const user = userData ? JSON.parse(userData) : null;
const isLoggedIn = userData ? true : false;

const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn,
        user,
        error: null
    },
    reducers: {
        signInSucceded: (auth, action) => {
            const user = action.payload;
            auth.isLoggedIn = true;
            auth.user = user;
            auth.error = null;
            sessionStorage.setItem(userKey, JSON.stringify(user));
        },
        signInFailed: (auth, action) => {
            auth.isLoggedIn = false;
            auth.user = null;
            auth.error = action.payload;
        },
        sessionExpired: (auth, action) => {
            auth.isLoggedIn = false;
            auth.user = null;
            auth.error = "Session expired. Please sign in again."
            sessionStorage.removeItem(userKey);
        },
        signoutUser: (auth, action) => {
            auth.isLoggedIn = false;
            auth.user = null;;
            sessionStorage.removeItem(userKey);
        },
        resetAuthError: (auth, action) => {
            auth.error = null;
        }
    }
});

export const {
    signInSucceded,
    signInFailed,
    sessionExpired,
    signoutUser,
    resetAuthError
} = slice.actions;

export default slice.reducer;

export const signOut = () => apiCallBegan({
    url: '/logout',
    method: 'post',
    onStart: requestInitiated.type,
    onSuccess: signoutUser.type,
    onComplete: requestCompleted.type
})

export const isAuthenticated = createSelector(
    state => state.entities.auth,
    auth => auth.isLoggedIn
);

export const getSignInError = createSelector(
    state => state.entities.auth,
    auth => auth.error
);