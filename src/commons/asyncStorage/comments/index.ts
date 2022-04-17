import { getObjectFromStorage, saveObjectToStorage } from '../storage';
import { CommentType } from '../../../services/comments';
import { AddReplyType } from '../../../redux/comments/commentsSlice';

const COMMENTS_KEY: string = '@comments';
const ADDED_COMMENTS_KEY: string = '@added/comments';
const ADDED_VOTES_KEY: string = '@added/votes';

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

export const saveVotesToStorage = async (votes: { [char: string]: number }) => {
  return saveObjectToStorage(ADDED_VOTES_KEY, votes);
};

export const getSavedVotesFromStorage = async () => {
  return await getObjectFromStorage(ADDED_VOTES_KEY);
};
