import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type TCartItem = {
  id: string
  title: string
  type: string
  price: number
  imageUrl: string
  count: number
  size: number
}

interface CartSliceState {
  totalPrice: number
  items: TCartItem[]
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
}

const findItem = (state: CartSliceState, action: PayloadAction<TCartItem>) => {
  return state.items.find(
    (obj) =>
      obj.id === action.payload.id &&
      obj.type === action.payload.type &&
      obj.size === action.payload.size
  )
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // рабочий вариант
    //
    // addItem(state, action) {
    //   state.items.push(action.payload);
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     sum += obj.price;
    //     return sum;
    //   }, 0);
    // },
    //
    // альтернативный вариант
    addItem(state, action: PayloadAction<TCartItem>) {
      const findAddingItem = findItem(state, action)
      if (findAddingItem) {
        findAddingItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        sum += obj.price * obj.count
        return sum
      }, 0)
    },

    removeItem(state, action: PayloadAction<TCartItem>) {
      const findRemovingItem = findItem(state, action)
      findRemovingItem &&
        (state.totalPrice -= findRemovingItem.price * findRemovingItem.count)
      state.items = state.items.filter(
        (obj) =>
          obj.id !== action.payload.id ||
          obj.size !== action.payload.size ||
          obj.type !== action.payload.type
      )
    },

    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },

    minusItem(state, action: PayloadAction<TCartItem>) {
      const findRedusedItem = findItem(state, action)
      if (findRedusedItem) {
        findRedusedItem.count--

        state.totalPrice -= findRedusedItem.price
        if (
          findRedusedItem.count === 0 &&
          window.confirm('Вы хотите удалить все пиццы данного типа?')
        ) {
          state.items = state.items.filter(
            (obj) =>
              obj.id !== action.payload.id ||
              obj.size !== action.payload.size ||
              obj.type !== action.payload.type
          )
        } else {
          findRedusedItem.count = 1
          state.totalPrice += findRedusedItem.price
        }
      }
    },
  },
})

export const selectCart = (state: RootState) => state.cart

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer
