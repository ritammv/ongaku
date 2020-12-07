import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthGetUser } from './apiClientServer';
import { setAuthentication, setUser } from '../store/actionCreators';

export const CheckAuthenticateAndPopulate = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: State) => state.authentication);

  useEffect(() => {
    checkAuthGetUser()
      .then((resp) => {
        setUser(resp.user)(dispatch);
        setAuthentication(resp.success)(dispatch);
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  return isAuthenticated;
};
