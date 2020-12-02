interface Release {
  id: number;
  artists: {
    name: string;
  }[];
  year: number;
  labels:  {
    name: string;
  }[];
  title: string;
  genres: string[];
  styles: string[];
  url: string;
  image: string;
}

interface SearchResult {
  id: number
  artist: {name: string},
  year: number,
  label: string,
  title: string,
  genre: string[],
  styles: result.styles,
  resource_url: string,
  cover_image: string
}

interface CreatePostForm {
  query: string;
  artist: string;
  title: string;
  label: string;
  year: string;
}

interface FinalPost {
  card: Release
  message_title: string
  message_body: string
}


interface User {
  id: number
  discogsId: number
  username: string
  avatarUrl: string
  wantsUrl: string
  collectionUrl: string
}

type State = {
  user: User
  isLoading: boolean
  channel: string
  authentication: boolean
  selected: Release | Want | SearchData
};

type UserAction = {
  type: string
  user: User
};

type DispatchType = (args: OrActionTypes) => OrActionTypes;

type isLoadingAction = {
  type: string
  isLoading: boolean
};

type channelAction = {
  type: string
  channel: string
};

type authenticationAction = {
  type: string
  authenticated: boolean
};

type SelectAction = {
  type: string
  selected: Release | Want | SearchData
};

type OrActionTypes =
UserAction | isLoadingAction | channelAction | authenticationAction | SelectAction;

type AllActionTypes = 
  UserAction & isLoadingAction & channelAction & authenticationAction & SelectAction;
