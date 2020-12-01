import thunk from 'redux-thunk';
import { createStore, applyMiddleware, Store } from 'redux';
import reducer from './reducer';



export const store: Store<State, UserAction | isLoadingAction | channelAction | authenticationAction> & {
  dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk));