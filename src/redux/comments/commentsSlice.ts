import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { CommentType, mockedComments } from '../../services/comments';
import {
  getCommentsFromStorage,
  getSavedRepliesFromStorage,
  getSavedVotesFromStorage,
  saveAddedRepliesToStorage,
  saveCommentsToStorage,
  saveVotesToStorage,
} from '../../commons/asyncStorage/comments';

export type AddReplyType = {
  reply: CommentType;
  parentCommentId: string;
};

interface CommentsSliceType {
  values: CommentType[];
  insertedValues: AddReplyType[];
  votes: { [char: string]: number };
  loading: boolean;
  error: string | null;
}

type ChangeVoteType = {
  vote: number;
  commentId: string;
};

export const loadComments = createAsyncThunk(
  'comments/LOAD_COMMENTS',
  async (data, { dispatch }) => {
    let comments = await getCommentsFromStorage();
    if (!comments || comments.length === 0) {
      dispatch(setComments(mockedComments));
      await saveCommentsToStorage(mockedComments);
    } else {
      dispatch(setComments(comments));
    }
  },
);

export const loadReplies = createAsyncThunk(
  'comments/LOAD_REPLIES',
  async (data, { dispatch }) => {
    try {
      let replies = await getSavedRepliesFromStorage();
      if (replies) {
        dispatch(setReplies(replies));
      }
    } catch (error) {
      console.log('Error getting saved replies', error);
    }
  },
);

export const loadVotes = createAsyncThunk(
  'comments/LOAD_VOTES',
  async (data, { dispatch }) => {
    try {
      let votes = await getSavedVotesFromStorage();
      if (votes) {
        dispatch(setVotes(votes));
      }
    } catch (error) {
      console.log('Error getting saved replies', error);
    }
  },
);

export const addReply = createAsyncThunk(
  'comments/ADD_REPLY',
  async (addedReply: AddReplyType, { dispatch }) => {
    try {
      dispatch(insertReply(addedReply));
      const savedRepliesInStorage = await getSavedRepliesFromStorage();
      if (savedRepliesInStorage) {
        savedRepliesInStorage.unshift(addedReply);
        await saveAddedRepliesToStorage(savedRepliesInStorage);
      } else {
        await saveAddedRepliesToStorage([addedReply]);
      }
    } catch (e) {
      console.log('Error adding reply', e);
    }
  },
);

export const addCommentToArticle = createAsyncThunk(
  'comments/ADD_COMMENT_TO_ARTICLE',
  async (addedComment: CommentType, { dispatch }) => {
    try {
      dispatch(insertCommentToArticle(addedComment));
      let comments = await getCommentsFromStorage();
      if (comments) {
        comments.unshift(addedComment);
        await saveCommentsToStorage(comments);
      } else {
        await saveCommentsToStorage([comments]);
      }
    } catch (e) {
      console.log('Error adding comment to article', e);
    }
  },
);

export const addVote = createAsyncThunk(
  'comments/ADD_VOTE',
  async (voteData: ChangeVoteType, { dispatch }) => {
    try {
      dispatch(changeVote(voteData));
      const { vote, commentId } = voteData;
      const savedVotes = await getSavedVotesFromStorage();
      if (savedVotes) {
        savedVotes[commentId] = vote;
        await saveVotesToStorage(savedVotes);
      } else {
        await saveVotesToStorage({ [commentId]: vote });
      }
    } catch (e) {
      console.log('Error saving vote', e);
    }
  },
);

const initialState: CommentsSliceType = {
  values: [],
  insertedValues: [],
  votes: {},
  loading: false,
  error: null,
};

export const CommentsSlice = createSlice({
  name: 'Comments',
  initialState,
  reducers: {
    setComments: (
      state: CommentsSliceType,
      action: PayloadAction<CommentType[]>,
    ) => {
      state.values = action.payload;
    },
    insertReply: (
      state: CommentsSliceType,
      action: PayloadAction<AddReplyType>,
    ) => {
      const { reply, parentCommentId } = action.payload;
      state.insertedValues.unshift({ reply, parentCommentId });
    },
    insertCommentToArticle: (
      state: CommentsSliceType,
      action: PayloadAction<CommentType>,
    ) => {
      state.values.unshift(action.payload);
    },
    setReplies: (
      state: CommentsSliceType,
      action: PayloadAction<AddReplyType[]>,
    ) => {
      state.insertedValues = action.payload;
    },
    changeVote: (
      state: CommentsSliceType,
      action: PayloadAction<ChangeVoteType>,
    ) => {
      state.votes[action.payload.commentId] = action.payload.vote;
    },
    setVotes: (
      state: CommentsSliceType,
      action: PayloadAction<{ [char: string]: number }>,
    ) => {
      state.votes = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadComments.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loadComments.rejected, state => {
      state.loading = false;
      state.error = 'Error loading comments';
    });
    builder.addCase(loadComments.fulfilled, state => {
      state.loading = false;
      state.error = null;
    });
  },
});

export const {
  setComments,
  insertReply,
  setReplies,
  changeVote,
  setVotes,
  insertCommentToArticle,
} = CommentsSlice.actions;

export default CommentsSlice.reducer;
