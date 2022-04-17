import { RootState } from '../store';
import { ArticleType } from '../../services/articles';
import { CommentType } from '../../services/comments';

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

export const selectAddedReplies = (
  state: RootState,
  parentCommentId: string,
) => {
  const result: CommentType[] = [];
  state.comments.insertedValues.forEach(inserted => {
    if (inserted.parentCommentId === parentCommentId) {
      result.push(inserted.reply);
    }
  });

  return result;
};
