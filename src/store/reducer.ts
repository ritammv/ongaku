import * as actionTypes from './actionTypes';

const initialState: State = {
  user: {
    id: 12,
    username: 'mandy',
    resourceUrl: 'www.belgium.com',
    token: 'this is mandys token',
    tokenSecret: 'secret in belgian',
    createdAt: '2020',
    updatedAt: '1998',
    channels: [],
  },
  isLoading: false,
  authentication: false,
  selected: {
    id: 0,
    artists: [],
    year: 0,
    labels: [],
    title: '',
    genres: [],
    styles: [],
    url: '',
    image: '',
  }
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
    case actionTypes.ADD_CHANNELS: {
      const channels = [...state.user.channels, action.channel];
      const updatedUser = { ...state.user };
      updatedUser.channels = channels;
      return { ...state, user: updatedUser };
    }
    case actionTypes.SET_AUTHENTICATION:
      return { ...state, authentication: action.authenticated };
    case actionTypes.SET_SELECTED:
      return { ...state, selected: action.selected };
  }
  return state;
};

export default reducer;