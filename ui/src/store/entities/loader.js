import { createSelector, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "loader",
    initialState: {
        loading: false
    },
    reducers: {
        requestInitiated: (loader, action) => {
            loader.loading = true;
        },
        requestCompleted: (loader, action) => {
            loader.loading = false;
        }
    }
});


export const {
    requestInitiated,
    requestCompleted
} = slice.actions;
export default slice.reducer; 

export const getLoading = createSelector(
    state => state.entities.loader,
    loader => loader.loading
);