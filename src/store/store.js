import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import { userReducer } from './users/usersReducer'

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
