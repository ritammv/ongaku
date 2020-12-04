import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthGetUser } from './apiClient';
import { setAuthentication, setUser } from '../store/actionCreators';

export const CheckAuthenticateAndPopulate = () => {
  const dispatch = useDispatch(); 
  const isAuthenticated = useSelector((state: State) => state.authentication);

  useEffect(() => {
    checkAuthGetUser()
      .then(({ success, user }) => {
        setUser(user)(dispatch);
        setAuthentication(success)(dispatch);
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  return isAuthenticated;
};