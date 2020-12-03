import * as actionTypes from './actionTypes';

const initialState: State = {
  user: {
    id: 'c42a1eb1-129e-452e-9363-acea5f9b2d7c',
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
    id: '35d729d5-b0dd-4c29-bd8f-09ce4a807fb3',
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