import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './users/usersReducer'

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
