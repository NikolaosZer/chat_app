import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chats: [],
    selectedChat: null,
    loading: false,
    error: null
};

export const chatsSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        setChats: (state, action) => {
            return {
                ...state,
                chats: [...action.payload],
                loading: false,
            }
        },
        setSelectedChat: (state, action) => {
            return {
                ...state,
                selectedChat: action.payload ? { ...action.payload } : null,
            }
        },
        setChatsLoading: (state) => {
            return {
                ...state,
                loading: true,
            }
        },
        setChatsError: (state, action) => {
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        },
    },
});

export const { setChats, setSelectedChat, setChatsLoading, setChatsError } = chatsSlice.actions;

export const selectChats = (state) => state.chats.chats;
export const selectSelectedChat = (state) => state.chats.selectedChat;
export const selectChatsLoading = (state) => state.friends.loading;
export const selectChatsError = (state) => state.friends.error;

export default chatsSlice.reducer;