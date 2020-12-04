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
  currChannel:  {
    'id': 'd0ed9e2c-6b9f-4b34-9695-5d7cb007eee4',
    'name': "Ambient 90's",
    'ownerId': '247835',
    'private': true,
    'parentId': null,
    'posts': [],
  },
  isLoading: false,
  authentication: false,
  selected: {
    id: 1,
    artists: [{
      name: 'hello'
    }],
    year: 2014,
    labels: [{
      name: 'Terminal'
    }],
    title: 'pls work',
    genres: ['Experimental'],
    styles: [],
    url: '',
    image: '',
  },
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
