import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { rootReducer } from '../reducers';
import { store } from '../..';
import { TApplicationActions } from '../actions';

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
	ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;