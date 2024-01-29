import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    loading: false,
    error: null
};

export const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessages: (state, action) => {
            return {
                ...state,
                messages: [...action.payload],
                loading: false
            };
        },
        setMessagesLoading: (state) => {
            return {
                ...state,
                loading: true,
            }
        },
        setMessagesError: (state, action) => {
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        },
    },
});

export const { setMessages, setMessagesLoading, setMessagesError } = messagesSlice.actions;

export const selectMessages = (state) => state.messages.messages;
export const selectMessagesLoading = (state) => state.messages.loading;
export const selectMessagesError = (state) => state.messages.error;

export default messagesSlice.reducer;