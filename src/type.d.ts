interface Release {
  id: number;
  artists_sort?: string;
  year?: number;
  labels?: string[];
  title: string;
  genres?: string[];
  styles?: string[];
  url?: string;
  huge_thumb: string;
  data?: object;
}

interface Want {
  id: number;
  artists: {
    name?: string;
  }[];
  year?: number;
  labels?: string[];
  title: string;
  genres?: string[];
  styles?: string[];
  resource_url?: string;
  cover_image: string;
  data?: object;
}

interface SearchData {
  id?: number;
  title: string;
  artist: string;
  cover_image: string;
}

interface CreatePostForm {
  query: string;
  artist: string;
  title: string;
  label: string;
  year: string;
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

type OrActionTypes =
UserAction | isLoadingAction | channelAction | authenticationAction;

type AllActionTypes = 
  UserAction & isLoadingAction & channelAction & authenticationAction;
