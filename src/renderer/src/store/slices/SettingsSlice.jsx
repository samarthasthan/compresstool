import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action) => {
      window.electron.ipcRenderer.send('set-settings', action.payload)
    },
    getSettings: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setSettings, getSettings } = settingsSlice.actions

export default settingsSlice.reducer
