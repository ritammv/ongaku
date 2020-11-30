import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { reducer } from '../reducer';
import { AppActions } from '../types/actions';



export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  reducer,
  applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);