import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CommentType, mockedComments } from '../../services/comments';
import {
  getCommentsFromStorage,
  saveComments,
} from '../../commons/asyncStorage/comments';

export const loadComments = createAsyncThunk(
  'comments/LOAD_COMMENTS',
  async (data, { dispatch }) => {
    let comments = await getCommentsFromStorage();
    if (!comments || comments.length === 0) {
      dispatch(setComments(mockedComments));
      await saveComments(mockedComments);
    } else {
      dispatch(setComments(comments));
    }
  },
);

interface CommentsSliceType {
  values: CommentType[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsSliceType = {
  values: [],
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

export const { setComments } = CommentsSlice.actions;

export default CommentsSlice.reducer;
