import { configureStore } from '@reduxjs/toolkit';
import ArticlesSlice from './articles/articlesSlice';

export const store = configureStore({
  reducer: {
    articles: ArticlesSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
