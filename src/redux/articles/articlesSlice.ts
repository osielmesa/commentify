import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleType } from '../../services/articles';

type initialStateType = {
  selected: ArticleType | null;
};

const initialState: initialStateType = {
  selected: null,
};

export const ArticlesSlice = createSlice({
  name: 'comments/SET_SELECTED_ARTICLE',
  initialState,
  reducers: {
    setSelectedArticle: (state, action: PayloadAction<ArticleType | null>) => {
      state.selected = action.payload;
    },
  },
});

export const { setSelectedArticle } = ArticlesSlice.actions;

export default ArticlesSlice.reducer;
