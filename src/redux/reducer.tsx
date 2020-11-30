import { User } from './types/User';
import {
  ActionTypes, 
  SET_AUTH, 
  SET_CHANNEL, 
  SET_LOADING, 
  SET_USER, 
  SET_ERROR
} from './types/actions';

export interface SystemState {
  isLoading: boolean
  isAuthenticated: boolean
  error: string
  channel: string
  user: User
}

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  error: 'Something went wrong',
  channel: 'home',
  user: {
    id: 1,
    discogsId: 8500180,
    username: 'nijssenmandy89',
    avatarUrl: 'https://secure.gravatar.com/avatar/  329961882160df9228422bbdee121320?s=500&r=pg&d=mm',
    wantsUrl: 'https://api.discogs.com/users/nijssenmandy89/wants',
    collectionUrl: 'https://api.discogs.com/users/nijssenmandy89/collectionfields'
  }
};

function reducer(
  state = initialState, 
  action: ActionTypes): SystemState {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    case SET_AUTH:
      return {
        ...state,
        isAuthenticated: action.payload
      };

    case SET_CHANNEL:
      return {
        ...state,
        channel: action.payload
      };

    case SET_ERROR: 
      return {
        ...state,
        error: action.payload
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
      
    default:
      return state;
  }
}

export { reducer };