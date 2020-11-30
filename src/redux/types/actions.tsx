import { User } from './User';

export const SET_LOADING = 'SET_LOADING';
export const SET_AUTH = 'SET_AUTH';
export const SET_ERROR = 'SET_ERROR';
export const SET_USER = 'SET_USER'; 
export const SET_CHANNEL = 'SET_CHANNEL'; 

export interface SetLoading {
  type: typeof SET_LOADING;
  payload: boolean
}

export interface IsAuthenticated {
  type: typeof SET_AUTH;
  payload: boolean
}

export interface SetError {
  type: typeof SET_ERROR;
  payload: string
}

export interface SetChannel {
  type: typeof SET_CHANNEL;
  payload: string
}

export interface SetUser {
  type: typeof SET_USER;
  payload: User
}

export type ActionTypes = 
  | SetLoading 
  | IsAuthenticated 
  | SetError 
  | SetChannel 
  | SetUser;

export type AppActions = ActionTypes;

