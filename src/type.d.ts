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
  posts: Post[]
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

interface User {
  id: number
  username: string
  resourceUrl: string
  token: string
  tokenSecret: string
  channels: Channel[] | []
  createdAt: string
  updatedAt: string
  posts: Posts[] | []
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

type UserForRitam = {
  // type: string;
  id: string;
  // discogsId: number;
  // username: string;
  // avatarUrl: string;
  // wantsUrl: string;
  // collectionUrl: string;
  posts: Post[];
  channels: Channel[];
  comments: Comment[];
  token: string;
  tokenSecret: string;
};

type State = {
  user: User
  isLoading: boolean
  authentication: boolean
  selected: Release
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

interface Channel {
  id: string;
  name: string;
  ownerId: string;
  parentId: string;
  private: boolean;
}

interface SelectAction {
  type: string;
  selected: Release;
}

interface ChannelForDb {
  id: string;
  name: string;
}
