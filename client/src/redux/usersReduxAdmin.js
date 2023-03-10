import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    isFetching: false,
    error: false
  },
  reducers: {
    //get all
    getUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //delete
    deleteUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.splice(
        state.users.findIndex((item) => item.id === action.payload),
        1
      );
    },
    deleteUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //update
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users[state.users.findIndex((item) => item.id === action.payload.id)] = action.payload.user;
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //add
    addUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.push(action.payload.user);
    },
    addUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    }
  }
});

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure
} = usersSlice.actions;
export default usersSlice.reducer;
