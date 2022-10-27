import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchQuizzes } from '../service/api';
// quiz: {
//     id,
//     title,
//     des,
//     type: QUIZ_TYPES,
//     answers: string[] | undefined,
//     subQuizzes: quiz[]
//     validateAnswer: {length, min, max}
// }

const initialState = {
  isFetching: false,
  quizzes: [],
};

const fetchQuizzesAsync = createAsyncThunk('quiz/fetchQuizzes', async () => {
  const { quizzes = [] } = await fetchQuizzes();
  return { quizzes };
});

export const quizzesSlice = createSlice({
  name: 'quiz',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchQuizzesAsync.pending, state => {
        state.isFetching = true;
      })
      .addCase(fetchQuizzesAsync.fulfilled, (state, action) => {
        const { quizzes } = action.payload;
        state.isFetching = false;
        state.quizzes = quizzes;
      })
      .addCase(fetchQuizzesAsync.rejected, state => {
        state.isFetching = false;
      });
  },
});

export const quizzesSelector = state => state.quiz;
export const quizzesDispatcher = dispatch => ({
  fetchQuizzes: () => dispatch(fetchQuizzesAsync()),
});

export default quizzesSlice.reducer;
