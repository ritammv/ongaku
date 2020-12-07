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
  currChannel: {
    id: '',
    name: '',
    ownerId: 0,
    private: true,
    parentId: null,
    posts: [],
    subChannel: [],
  },
  isLoading: true,
  authentication: false,
  selected: {
    id: 1,
    artists: [
      {
        name: '',
      },
    ],
    year: 2014,
    labels: [
      {
        name: '',
      },
    ],
    title: '',
    genres: [''],
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
      // const channels = [...state.user.channels, action.channel];
      let channels = [...state.user.channels];
      console.log(action.channel);
      console.log('channels', channels);
      if (action.channel.parentId) {
        const parentIndex = channels.findIndex(
          (chan) => chan.id === action.channel.parentId
        );
        console.log(parentIndex);
        if (parentIndex === -1) {
          channels = [...channels, action.channel];
        } else {
          channels.splice(parentIndex + 1, 0, action.channel);
        }
      } else {
        channels = [...channels, action.channel];
      }

      const updatedUser = { ...state.user };
      updatedUser.channels = channels;
      console.log('update user', updatedUser);
      return { ...state, user: updatedUser };
    }
    case actionTypes.SET_AUTHENTICATION:
      return { ...state, authentication: action.authenticated };
    case actionTypes.SET_SELECTED:
      return { ...state, selected: action.selected };
    case actionTypes.ADD_CURR_CHANNEL:
      return { ...state, currChannel: action.channel };
    case actionTypes.USER_UNSUBSCRIBE_CHANNEL: {
      const channels = [...state.user.channels].filter(
        (channel) => channel.id !== action.channel.id
      );
      const updatedUser = { ...state.user };
      updatedUser.channels = channels;
      return { ...state, user: updatedUser };
    }
  }
  return state;
};

export default reducer;
