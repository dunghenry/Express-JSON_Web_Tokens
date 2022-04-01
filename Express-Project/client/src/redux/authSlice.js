import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    login: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    register: {
        isFetching: false,
        error: false,
        success: false,
    },
    logout: {
        isFetching: false,
        error: false,
    }
}
const authSlice = createSlice(
    {
        name: "auth",
        initialState,
        reducers: {
            loginStart: (state) => {
                state.login.isFetching = true;
            },
            loginSuccess: (state, action) => {
                state.login.isFetching = false;
                state.login.currentUser = action.payload;
                state.login.error = false;
            },
            loginFailed: (state) => {
                state.login.isFetching = false;
                state.login.error = true;
            },
            registerStart: (state) => {
                state.register.isFetching = true;
            },
            registerSuccess: (state) => {
                state.register.isFetching = false;
                state.register.error = false;
                state.register.success = true;
            },
            registerFailed: (state) => {
                state.register.isFetching = false;
                state.register.error = true;
            },
            logOutSuccess: (state) => {
                state.login.isFetching = false;
                state.login.currentUser = null;
                state.login.error = false;
            },
            logOutFailed: (state) => {
                state.login.error = true;
            },
            logOutStart: (state) => {
                state.login.isFetching = true;
            }
        }
    }
);
export const { loginStart, loginSuccess, loginFailed, registerStart, registerSuccess, registerFailed, logOutStart, logOutSuccess, logOutFailed} = authSlice.actions;
export default authSlice.reducer;