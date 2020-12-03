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

interface Post {
  id: string
  postTitle: string
  title: string
  artist: string
  label: string
  year: number
  thumbnail: string
  body: string
  url: string
  createdAt: string
  updatedAt: string
  channelId: string
  userId: string
  comments: PostComment[]
  tags: Tag[]
}

interface Channel {
  id: string;
  name: string;
  ownerId: string | null;
  parentId: string | null;
  private: boolean;
}

interface PostComment {
  body: string
  createdAt: string | number | Date;
  updatedAt?: string
  userId: string
  postId: string
  id: string
}

interface Tag {
  id: string
  name: string
}

interface User {
  id: string
  discogsId: number
  username: string
  avatarUrl: string
  wantsUrl: string
  collectionUrl: string
  posts: Post[]
  channels: Channel[]
  comments: Comment[]
}

type State = {
  user: User
  isLoading: boolean
  channel: Channel
  authentication: boolean
  selected: Release
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
  channel:Channel
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
