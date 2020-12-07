/* eslint-disable @typescript-eslint/indent */
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, Store } from 'redux';
import reducer from './reducer';

export const store: Store<
  // eslint-disable-next-line @typescript-eslint/indent
  State,
  // eslint-disable-next-line @typescript-eslint/indent
  UserAction | IsLoadingAction | ChannelAction | 
  AuthenticationAction | SavedPostsAction
> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));
