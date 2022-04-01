import axios from 'axios';
import { loginStart, loginSuccess, loginFailed, registerStart, registerFailed, registerSuccess, logOutStart, logOutFailed, logOutSuccess } from './authSlice';
import { getUsersStart , getUsersFailed, getUsersSuccess, deleteUserStart,deleteUserSuccess, deleteUserFailed} from '../redux/userSlice';
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:4000/api/v1/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (error) {
        dispatch(loginFailed());
    }
}

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post("http://localhost:4000/api/v1/auth/register", user);
        dispatch(registerSuccess());
        navigate("/login");
    } catch (error) {
        dispatch(registerFailed());
    }
}

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersStart());
    try {
        const res = await axiosJWT.get("http://localhost:4000/api/v1/user", {
            headers: { token: `Bearer ${accessToken}` }
        });
        dispatch(getUsersSuccess(res.data));
    } catch (error) {
        dispatch(getUsersFailed());
    }
}

export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteUserStart());
    try {
        const res = await axiosJWT.delete(`http://localhost:4000/api/v1/user/${id}`, {
            headers: { token: `Bearer ${accessToken}` }
        });
        dispatch(deleteUserSuccess(res.data));
    } catch (error) {
        dispatch(deleteUserFailed(error.response.data));
    }
}
export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logOutStart());
    try {
        await axiosJWT.post("http://localhost:4000/api/v1/auth/logout", id, {
            headers: { token: `Bearer ${accessToken}` }
        })
        dispatch(logOutSuccess());
        navigate("/login");
    } catch (error) {
        dispatch(logOutFailed());
    }
}