import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: { name: 'популярности', sortProperty: 'raiting' },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId , setSortType} = filterSlice.actions;

export default filterSlice.reducer;
