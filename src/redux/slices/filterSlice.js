import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: { name: 'популярности', sortProperty: 'raiting' },
  searchValue: '',
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSortType(state, action) {
      state.sort = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage)
      state.categoryId = Number(action.payload.categoryId)
      state.sort.sortProperty = action.payload.sortProperty
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions

export default filterSlice.reducer
