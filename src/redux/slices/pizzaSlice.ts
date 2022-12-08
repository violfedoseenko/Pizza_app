import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export enum Status {
  LOADING = 'loading',
  SUCSESS = 'success',
  ERROR = 'error',
}

type Pizza = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
}

interface PizzaSliceState {
  items: Pizza[]
  status: 'loading' | 'success' | 'error'
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
}

// export type FetchPizzasArgs = Record<string, string> // все ключи и значения объекта являютсмя строками
export type FetchPizzasArgs = {
  order: string
  sortBy: string
  category: string
  search: string
  currentPage: string
}

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  'pizza/fetchPizzasStatus',
  async (params: FetchPizzasArgs) => {
    const { order, sortBy, category, search, currentPage } = params
    const { data } = await axios.get<Pizza[]>(
      `https://633de0927e19b17829176b54.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
    )

    return data
  }
)

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCSESS
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  },
  // {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading'
  //     state.items = []
  //     console.log('Идет отправка')
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload
  //     state.status = 'success'
  //     console.log(state, 'okk')
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = 'error'
  //     console.log('Была ошибка')
  //     state.items = []
  //   },
  // },
})

// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
