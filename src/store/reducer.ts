import * as actionTypes from './actionTypes';

const initialState: State = {
  user: {
    username: '',
    posts: [],
    channels: [],
    token: '',
    tokenSecret: '',
    id: 0,
    resourceUrl: '',
    createdAt: '',
    updatedAt: '',
  },
  currChannel: {},
  isLoading: false,
  authentication: false,
  selected: {},
};

const reducer = (
  state: State = initialState,
  action: AllActionTypes
): State => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.user };
    case actionTypes.SET_ISLOADING:
      return { ...state, isLoading: action.isLoading };
    case actionTypes.ADD_USER_CHANNEL: {
      const channels = [...state.user.channels, action.channel];
      const updatedUser = { ...state.user };
      updatedUser.channels = channels;
      return { ...state, user: updatedUser };
    }
    case actionTypes.SET_AUTHENTICATION:
      return { ...state, authentication: action.authenticated };
    case actionTypes.SET_SELECTED:
      return { ...state, selected: action.selected };
    case actionTypes.ADD_CURR_CHANNEL:
      return { ...state, currChannel: action.channel };
  }
  return state;
};

export default reducer;
