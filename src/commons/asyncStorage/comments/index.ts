import { getObjectFromStorage, saveObjectToStorage } from '../storage';
import { CommentType } from '../../../services/comments';

const COMMENTS_KEY: string = '@comments';

export const getCommentsFromStorage = async () => {
  return await getObjectFromStorage(COMMENTS_KEY);
};

export const saveComments = (comments: Array<CommentType>) => {
  return saveObjectToStorage(COMMENTS_KEY, comments);
};
