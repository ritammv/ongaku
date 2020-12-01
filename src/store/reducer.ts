import * as actionTypes from './actionTypes';

const initialState: State = {
  user: {
    id: 1,
    discogsId: 8500180,
    username: 'nijssenmandy89',
    avatarUrl: 'https://secure.gravatar.com/avatar/329961882160df9228422bbdee121320?s=500&r=pg&d=mm',
    wantsUrl: 'https://api.discogs.com/users/nijssenmandy89/wants',
    collectionUrl: 'https://api.discogs.com/users/nijssenmandy89/collectionfields'
  },
  isLoading: false,
  channel: 'techno',
  authentication: false
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
  }
  return state;
};

export default reducer;