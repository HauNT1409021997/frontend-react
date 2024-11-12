import { createStore, combineReducers } from 'redux';
import UserReducer from '../reducers/UserReducer.ts';

// Combining reducers
const rootReducer = combineReducers({
    userStore: UserReducer,
});

// Create Redux store
const store = createStore(rootReducer);

export default store;
