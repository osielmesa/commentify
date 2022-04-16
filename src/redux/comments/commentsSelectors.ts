import { RootState } from '../store';
import { ArticleType } from '../../services/articles';

export const selectComments = (
  state: RootState,
  selectedArticle: ArticleType | null,
) => {
  if (selectedArticle && state.comments.values.length > 0) {
    const comments = state.comments.values.filter(
      el => el.articleId === selectedArticle.id,
    );
    return comments;
  }
  return [];
};
