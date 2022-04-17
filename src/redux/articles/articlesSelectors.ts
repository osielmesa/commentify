// All selectors for articles data will be found here
import { RootState } from '../store';

export const selectSelectedArticle = (state: RootState) =>
  state.articles.selected;
