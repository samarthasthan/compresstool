import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: 'left' }

export const switchTabSlice = createSlice({
  name: 'switch',
  initialState,
  reducers: {
    toggle: (state, action) => {
      state.value = action.payload
    }
  }
})
export const { toggle } = switchTabSlice.actions
export default switchTabSlice.reducer
