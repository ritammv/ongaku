import * as actionTypes from './actionTypes';

export const setUser = (user: User) => {
  const action: UserAction = {
    type: actionTypes.SET_USER,
    user
  };
  return (dispatch: DispatchType) => dispatch(action);
};

export const setIsLoading = (isLoading: boolean) => {
  const action: isLoadingAction = {
    type: actionTypes.SET_ISLOADING,
    isLoading
  };
  return (dispatch: DispatchType) => dispatch(action);
};

export const setChannel = (channel: string) => {
  const action: channelAction = {
    type: actionTypes.SET_CHANNEL,
    channel
  };
  return (dispatch: DispatchType) => dispatch(action);
};

export const setAuthentication = (authenticated: boolean) => {
  const action: authenticationAction = {
    type: actionTypes.SET_AUTHENTICATION,
    authenticated
  };
  return (dispatch: DispatchType) => dispatch(action);
};