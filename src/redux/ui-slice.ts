import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UISliceState = {
  screenTitle: string
}

const initialState: UISliceState = {
  screenTitle: '',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setScreenTitle: (state, action: PayloadAction<string>) => {
      state.screenTitle = action.payload
    },
    clearScreenTitle: (state) => {
      state.screenTitle = ''
    },
  },
})

export const { setScreenTitle, clearScreenTitle } = uiSlice.actions
export default uiSlice.reducer
