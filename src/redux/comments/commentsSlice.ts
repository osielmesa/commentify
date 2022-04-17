import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { CommentType, mockedComments } from '../../services/comments';
import {
  getCommentsFromStorage,
  getSavedRepliesFromStorage,
  saveAddedRepliesToStorage,
  saveCommentsToStorage,
} from '../../commons/asyncStorage/comments';

export type AddReplyType = {
  reply: CommentType;
  parentCommentId: string;
};

interface CommentsSliceType {
  values: CommentType[];
  insertedValues: AddReplyType[];
  loading: boolean;
  error: string | null;
}

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

export const addReply = createAsyncThunk(
  'comments/ADD_REPLY',
  async (addedReply: AddReplyType, { dispatch }) => {
    dispatch(insertReply(addedReply));
    const savedRepliesInStorage = await getSavedRepliesFromStorage();
    if (savedRepliesInStorage) {
      savedRepliesInStorage.unshift(addedReply);
      await saveAddedRepliesToStorage(savedRepliesInStorage);
    } else {
      await saveAddedRepliesToStorage([addedReply]);
    }
  },
);

const initialState: CommentsSliceType = {
  values: [],
  insertedValues: [],
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
    setReplies: (
      state: CommentsSliceType,
      action: PayloadAction<AddReplyType[]>,
    ) => {
      state.insertedValues = action.payload;
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

export const { setComments, insertReply, setReplies } = CommentsSlice.actions;

export default CommentsSlice.reducer;
