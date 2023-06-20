import { applyMiddleware, legacy_createStore as createStore, Store } from 'redux';
import thunk from 'redux-thunk';

import { reducer } from './reducer';

const store: Store<AppState> = createStore(reducer, applyMiddleware(thunk));

export type AppState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export { store };
