import { configureStore } from '@reduxjs/toolkit'
import switchReducer from './slices/SwitchTabSlice'
const store = configureStore({
  reducer: {
    switch: switchReducer
  }
})

export default store
