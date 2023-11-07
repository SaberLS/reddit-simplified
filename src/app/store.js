import { configureStore } from '@reduxjs/toolkit';
import authorizationReducer from '../features/authorization/authorizationSlice';
import postsReducer from '../features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    posts: postsReducer
  }
});
