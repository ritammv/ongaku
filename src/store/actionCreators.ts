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

export const addChannel = (channel: Channel) => {
  const action: ChannelAction = {
    type: actionTypes.ADD_USER_CHANNEL,
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

export const setSelected = (selected: Release) => {
  const action: SelectAction = {
    type: actionTypes.SET_SELECTED,
    selected,
  };
  return (dispatch: DispatchType) => dispatch(action);
};

export const addCurrChannel = (channel: Channel) => {
  const action: ChannelAction = {
    type: actionTypes.ADD_CURR_CHANNEL,
    channel,
  };
  return (dispatch: DispatchType) => dispatch(action);
};

export const unsubscribeChannel = (channel: Channel) => {
  const action: ChannelAction = {
    type: actionTypes.USER_UNSUBSCRIBE_CHANNEL,
    channel,
  };
  return (dispatch: DispatchType) => dispatch(action);
};
