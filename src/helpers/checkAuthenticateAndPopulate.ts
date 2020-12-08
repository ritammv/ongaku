import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthGetUser, getForLater } from './apiClientServer';
import { savedPost, setAuthentication, setUser } from '../store/actionCreators';

export const CheckAuthenticateAndPopulate = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: State) => state.authentication);

  useEffect(() => {
    checkAuthGetUser()
      .then((resp) => {
        if (resp.success) {
          dispatch(setUser(resp.user));
          dispatch(setAuthentication(resp.success));
        }
        getForLater(resp.user.id).then((result) => {
          result && dispatch(savedPost(result));
        });
        // setUser(resp.user)(dispatch);
        // setAuthentication(resp.success)(dispatch);
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  return isAuthenticated;
};
