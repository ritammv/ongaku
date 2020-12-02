import * as actionTypes from './actionTypes';

export const setUser = (user: User) => {
  const action: UserAction = {
    type: actionTypes.SET_USER,
    user,
  };
  return (dispatch: DispatchType) => dispatch(action);
};

export const setIsLoading = (isLoading: boolean) => {
  const action: IsLoadingAction = {
    type: actionTypes.SET_ISLOADING,
    isLoading,
  };
  return (dispatch: DispatchType) => dispatch(action);
};

export const setChannel = (channel: string) => {
  const action: ChannelAction = {
    type: actionTypes.SET_CHANNEL,
    channel,
  };
  return (dispatch: DispatchType) => dispatch(action);
};

export const setAuthentication = (authenticated: boolean) => {
  const action: AuthenticationAction = {
    type: actionTypes.SET_AUTHENTICATION,
    authenticated,
  };
  return (dispatch: DispatchType) => dispatch(action);
};
