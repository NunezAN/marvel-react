import { configureStore } from '@reduxjs/toolkit'
import heroReducer from '../features/HeroSlice'

export const store = configureStore({
  reducer: {
    hero: heroReducer,
  },
})