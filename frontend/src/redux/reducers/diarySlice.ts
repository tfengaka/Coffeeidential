import { createSlice } from '@reduxjs/toolkit';
import { Diary } from '~/types';

interface DiaryState {
  diaries: Diary[];
  diary: Diary | null;
}

const initialState: DiaryState = {
  diaries: [],
  diary: null,
};

const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    setDiaries: (state, action) => {
      state.diaries = action.payload;
    },
    setDiary: (state, action) => {
      state.diary = action.payload;
    },
    createdDiary: (state, { payload }) => {
      state.diaries.push(payload);
    },
  },
});

export const { setDiaries, setDiary, createdDiary } = diarySlice.actions;
export default diarySlice.reducer;
