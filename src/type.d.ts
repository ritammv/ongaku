interface Release {
  id: number;
  artists: {
    name: string;
  }[];
  year: number;
  labels: {
    name: string;
  }[];
  title: string;
  genres: string[];
  styles: string[];
  url: string;
  image: string;
}

interface ReleaseDetails {
  id: number;
  artists: {
    name: string;
  }[];
  year: number;
  labels: {
    name: string;
  }[];
  title: string;
  genres: string[];
  styles: string[];
  url: string;
  image: string;
  type: string;
}

interface SearchResult {
  id: number;
  artist: { name: string };
  year: number;
  label: string;
  title: string;
  genre: string[];
  styles: result.styles;
  resource_url: string;
  cover_image: string;
}

interface CreatePostForm {
  query: string;
  artist: string;
  title: string;
  label: string;
  year: string;
}

interface FinalPost {
  card: Release;
  message_title: string;
  message_body: string;
}

interface Post {
  id: string;
  postTitle: string;
  title: string;
  artist: string;
  label: string;
  year: number;
  thumbnail: string;
  body: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  channelId: string;
  userId: number;
  comments: PostComment[];
  tags: Tag[];
}

interface Channel {
  id: string;
  name: string;
  ownerId: string | null;
  parentId: string | null;
  private: boolean;
  posts: Post[];
  subChannel: Channel[];
}

interface PostComment {
  body: string;
  createdAt: string | number | Date;
  updatedAt?: string;
  userId: number;
  postId: string;
  id: string;
}

interface Tag {
  id: string;
  name: string;
}

interface ChannelAndUsers {
  users: number;
  channel: Channel;
}

interface User {
  id: number;
  username: string;
  resourceUrl: string;
  token: string;
  tokenSecret: string;
  channels: Channel[] | [];
  createdAt: string;
  updatedAt: string;
  posts: Posts[] | [];
}

// type UserAction = {
//   type: string;
//   user: User;
//   id: string
//   discogsId: number
//   username: string
//   avatarUrl: string
//   wantsUrl: string
//   collectionUrl: string
//   posts: Post[]
//   channels: Channel[]
//   comments: Comment[]
// }

type State = {
  user: User;
  isLoading: boolean;
  currChannel: Channel;
  authentication: boolean;
  selected: Release;
};

type UserAction = {
  type: string;
  user: User;
};

type DispatchType = (args: OrActionTypes) => OrActionTypes;

type IsLoadingAction = {
  type: string;
  isLoading: boolean;
};

type ChannelAction = {
  type: string;
  channel: Channel;
};

type AuthenticationAction = {
  type: string;
  authenticated: boolean;
};

type OrActionTypes =
  | UserAction
  | isLoadingAction
  | channelAction
  | authenticationAction;

type AllActionTypes = UserAction &
  isLoadingAction &
  channelAction &
  authenticationAction;

interface SelectAction {
  type: string;
  selected: Release;
}

interface ChannelForDb {
  id: string;
  name: string;
}

interface Result {
  country: string;
  year: string;
  format: string[];
  label: string[];
  type: string;
  genre: string[];
  style: string[];
  id: number;
  barcode: string[];
  user_data: {
    in_wantlist: boolean;
    in_collection: boolean;
  };
  master_id: number;
  master_url: string;
  uri: string;
  catno: string;
  title: string;
  thumb: string;
  cover_image: string;
  resource_url: string;
  community: {
    want: number;
    have: number;
  };
}
