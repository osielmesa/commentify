import { RootState } from '../store';

export const selectSelectedArticle = (state: RootState) =>
  state.articles.selected;
