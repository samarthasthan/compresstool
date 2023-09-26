import { configureStore } from '@reduxjs/toolkit'
import switchReducer from './slices/SwitchTabSlice'
import settingsReducer from './slices/SettingsSlice'
const store = configureStore({
  reducer: {
    switch: switchReducer,
    settings: settingsReducer
  }
})

export default store
