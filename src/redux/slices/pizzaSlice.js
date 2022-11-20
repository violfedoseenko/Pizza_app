import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params, thunkAPI) => {
    const { order, sortBy, category, search, currentPage } = params
    const res = await axios.get(
      `https://633de0927e19b17829176b54.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
    )

    return res.data
  }
)

const initialState = {
  items: [],
  status: 'loading', // loading|success|error
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  // reducers: {
  //   setItems(state, action) {
  //     state.items = action.payload
  //   },
  // },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading'
      state.items = []
      console.log('Идет отправка')
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = 'success'
      console.log(state, 'okk')
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error'
      console.log('Была ошибка')
      state.items = []
    },
  },
})

// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
