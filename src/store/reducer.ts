import * as actionTypes from './actionTypes';

const initialState: State = {
  user: {
    id: '8ebedf47-a74c-42ca-a31e-50f2d5a34703',
    username: 'Mandju',
    token: 'jqmlfkjdsflqjfl',
    tokenSecret: 'qepfioameiopfsdo',
    // discogsId: 8500180,
    // username: 'nijssenmandy89',
    // avatarUrl:
    //   'https://secure.gravatar.com/avatar/329961882160df9228422bbdee121320?s=500&r=pg&d=mm',
    // wantsUrl: 'https://api.discogs.com/users/nijssenmandy89/wants',
    // collectionUrl:
    //   'https://api.discogs.com/users/nijssenmandy89/collectionfields',
    posts: [],
    channels: [],
    comments: [],
  },
  isLoading: false,
  channel: {
    id: '35d729d5-b0dd-4c29-bd8f-09ce4a807fb3',
    name: 'Electronic',
    ownerId: null,
    private: false,
    parentId: null,
    posts: []
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
