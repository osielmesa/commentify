import { getObjectFromStorage, saveObjectToStorage } from '../storage';
import { CommentType } from '../../../services/comments';
import { AddReplyType } from '../../../redux/comments/commentsSlice';

const COMMENTS_KEY: string = '@comments';
const ADDED_COMMENTS_KEY: string = '@added/comments';

export const getCommentsFromStorage = async () => {
  return await getObjectFromStorage(COMMENTS_KEY);
};

export const saveCommentsToStorage = (comments: Array<CommentType>) => {
  return saveObjectToStorage(COMMENTS_KEY, comments);
};

export const saveAddedRepliesToStorage = (replies: AddReplyType[]) => {
  return saveObjectToStorage(ADDED_COMMENTS_KEY, replies);
};

export const getSavedRepliesFromStorage = async () => {
  return await getObjectFromStorage(ADDED_COMMENTS_KEY);
};
