import { createSlice } from "@reduxjs/toolkit";
import {
    findUserByIDThunk,
    loginThunk,
    logoutThunk,
    profileThunk,
    registerThunk,
    updateUserThunk
} from "../services/users-thunks";



const usersSlice = createSlice({
    name: "user",
    initialState: { currentUser: null },
    reducers: {},
    extraReducers: {
        [loginThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [logoutThunk.fulfilled]: (state) => {
            state.currentUser = null;
        },
        [updateUserThunk.fulfilled]: (state, {payload}) => {
            state.currentUser = payload;
        },
        [profileThunk.fulfilled]: (state, {payload}) => {
            state.currentUser = payload;
        },
        [registerThunk.fulfilled]: (state,{payload}) => {
            state.currentUser = payload;
        }
    },
});
export default usersSlice.reducer;