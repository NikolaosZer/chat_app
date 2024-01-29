import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    selectedUser: null,
    loading: false,
    error: null
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            return {
                ...state,
                users: [...action.payload],
                loading: false
            };
        },
        setSelectedUser: (state, action) => {
            return {
                ...state,
                selectedUser: action.payload ? { ...action.payload } : null,
            };
        },
        setUsersLoading: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        setUsersError: (state, action) => {
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        },
    },
});

export const { setUsers, setSelectedUser, setUsersLoading, setUsersError } = usersSlice.actions;

export const selectUsers = (state) => state.users.users;
export const selectSelectedUser = (state) => state.users.selectedUser;
export const selectUsersLoading = (state) => state.users.loading;
export const selectUsersError = (state) => state.users.error;

export default usersSlice.reducer;