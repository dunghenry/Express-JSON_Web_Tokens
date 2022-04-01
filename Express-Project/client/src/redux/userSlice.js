import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    users: {
        allUsers: null,
        isFetching: false,
        error: false,
    },
    msg: "",
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUsersStart: (state) => {
            state.users.isFetching = true;
            
        },
        getUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
        },
        getUsersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        deleteUserStart: (state) => {
            state.users.isFetching = true;
        },
        deleteUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.msg = action.payload;
        },
        deleteUserFailed: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
             state.msg = action.payload;
        }
    }
})

export const { getUsersStart, getUsersSuccess, getUsersFailed, deleteUserSuccess, deleteUserFailed, deleteUserStart } = userSlice.actions;
export default userSlice.reducer;