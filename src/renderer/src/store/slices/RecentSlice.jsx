import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const recentSlice = createSlice({
  name: 'recent',
  initialState,
  reducers: {
    setRecents: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setRecents } = recentSlice.actions

export default recentSlice.reducer
