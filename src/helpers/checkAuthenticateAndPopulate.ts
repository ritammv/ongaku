import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthGetUser, getForLater } from './apiClientServer';
import { savedPost, setAuthentication, setUser } from '../store/actionCreators';

export const CheckAuthenticateAndPopulate = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: State) => state.authentication);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkAuthGetUser()
      .then((resp) => {
        if (resp.success) {
          dispatch(setUser(resp.user));
          dispatch(setAuthentication(resp.success));
        }
        setIsChecking(false);
        getForLater(resp.user.id)
          .then((result) => {
            result && dispatch(savedPost(result));
          });
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  return [isChecking, isAuthenticated];
};
