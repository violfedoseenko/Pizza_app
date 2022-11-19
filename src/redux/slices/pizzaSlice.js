import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const pizzaSlice = createSlice({
  name: 'pizza',
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
    setItems(state, action) {
      state.items = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
