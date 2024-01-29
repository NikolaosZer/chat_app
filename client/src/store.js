import { combineReducers, configureStore } from '@reduxjs/toolkit'
import usersReducer from './state/users/usersSlice';
import chatsReducer from './state/chats/chatsSlice';
import messagesReducer from './state/messages/messagesSlice';

const rootReducer = combineReducers({
    users: usersReducer,
    chats: chatsReducer,
    messages: messagesReducer,
});

export const store = configureStore({
    reducer: rootReducer
})

export default store;