import { Dispatch } from 'redux';
import { User } from './types/User';

import {
  AppActions, 
  SET_AUTH, 
  SET_CHANNEL, 
  SET_LOADING, 
  SET_USER, 
  SET_ERROR
} from './types/actions';

import { AppState } from './store/configStore';

export const SetLoading = (isLoading: boolean): AppActions => ({
  type: SET_LOADING,
  payload: isLoading
});

export const SetAuth = (isAuthenticated: boolean): AppActions => ({
  type: SET_AUTH,
  payload: isAuthenticated
});

export const SetError = (message: string): AppActions => ({
  type: SET_ERROR,
  payload: message
});

export const SetChannel = (channel: string): AppActions => ({
  type: SET_CHANNEL,
  payload: channel
});

export const SetUser = (user: User): AppActions => ({
  type: SET_USER,
  payload: user
});