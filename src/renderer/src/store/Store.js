import { configureStore } from '@reduxjs/toolkit'
import switchReducer from './slices/SwitchTabSlice'
import settingsReducer from './slices/SettingsSlice'
import recentReducer from './slices/RecentSlice'
const store = configureStore({
  reducer: {
    switch: switchReducer,
    settings: settingsReducer,
    recents: recentReducer
  }
})

export default store
