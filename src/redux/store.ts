import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import cart from './slices/cartSlice'
import pizza from './slices/pizzaSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    cart,
    pizza,
    filter,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch //тип со всеми экшенами из стора
export const useAppDispatch = () => useDispatch<AppDispatch>()
