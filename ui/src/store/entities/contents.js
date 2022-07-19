import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'contents',
    initialState: {
        data: [],
        error: null,
    },
    reducers: {
        contentsCreateSuccess: (contents, action) => {
            contents.data = action.payload;
            contents.loading = false;
        },
        contentsRequestFailed: (contents, action) => {
            contents.error = action.payload;
        }
    }
});

export const {
    contentsCreateSuccess,
    contentsRequestFailed 
} = slice.actions;

export default slice.reducer;