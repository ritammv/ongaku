interface User {
  id: number;
  discogsId: number;
  username: string;
  avatarUrl: string;
  wantsUrl: string;
  collectionUrl: string;
}

type State = {
  user: User;
  isLoading: boolean;
  channel: string;
  authentication: boolean;
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
  channel: string;
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
