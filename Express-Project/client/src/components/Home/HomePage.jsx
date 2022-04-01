import "./home.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers , deleteUser} from './../../redux/apiRequest';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../redux/authSlice';
import { createAxios } from '../../createInstance';
const HomePage = () => {
  const userData = useSelector((state) => state.user.users?.allUsers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const msg = useSelector((state) => state.user?.msg);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const handleDelete = (id) => {
    deleteUser(user?.accessToken, dispatch, id, axiosJWT);
  }
  useEffect(() => {
    if (!user) {
      navigate('/login');
    };
    if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);
  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">You role : { user?.isAdmin ? 'Admin': 'User' }</div>
      <div className="home-userlist">
        {userData?.map((user) => {
          return (
            <div key={user._id} className="user-container">
              <div className="home-user">{user.username}</div>
              <div className="delete-user" onClick={() => handleDelete(user._id)}> Delete </div>
            </div>
          );
        })}
      </div>
      <div className="errorMsg">{msg}</div>
    </main>
  );
};

export default HomePage;