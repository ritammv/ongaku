import * as actionTypes from './actionTypes';

const initialState: State = {
  user: {
    id: '3bcdd94b-d460-4d58-8050-c717005c025b',
    discogsId: 8500180,
    username: 'nijssenmandy89',
    avatarUrl: 'https://secure.gravatar.com/avatar/329961882160df9228422bbdee121320?s=500&r=pg&d=mm',
    wantsUrl: 'https://api.discogs.com/users/nijssenmandy89/wants',
    collectionUrl: 'https://api.discogs.com/users/nijssenmandy89/collectionfields',
    posts: [],
    channels: [],
    comments: []
  },
  isLoading: false,
  channel: {
    id: 'ef420411-97de-4fc8-9cf7-cfd5e3effd5e',
    name: 'Electronic',
    ownerId: null,
    private: false,
    parentId: null
  },
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
    case actionTypes.SET_CHANNEL:
      return { ...state, channel: action.channel };
    case actionTypes.SET_AUTHENTICATION:
      return { ...state, authentication: action.authenticated };
    case actionTypes.SET_SELECTED:
      return { ...state, selected: action.selected };
  }
  return state;
};

export default reducer;