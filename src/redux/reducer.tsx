export interface User {
  id: number
  discogsId: number
  username: string
  avatarUrl: string
  wantsUrl: string
  collectionUrl: string
}

export interface InitialState {
  isLoading: boolean
  isAuthenticated: boolean
  error: string
  channel: string
}

const InitialState = {
  isLoading: false,
  isAuthenticated: false,
  error: 'Something went wrong',
  channel: 'home',
  User: {
    id: 1,
    discogsId: 8500180,
    username: 'nijssenmandy89',
    avatarUrl: 'https://secure.gravatar.com/avatar/329961882160df9228422bbdee121320?s=500&r=pg&d=mm',
    wantsUrl: 'https://api.discogs.com/users/nijssenmandy89/wants',
    collectionUrl: 'https://api.discogs.com/users/nijssenmandy89/collection/fields'
  }
};

function reducer(state = InitialState, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: !state.isLoading
      };
  }
}