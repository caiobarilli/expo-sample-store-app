import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UIState = {
  products: number[]
}

const initialState: UIState = {
  products: [],
}

const uiSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const productId = action.payload
      if (state.products.includes(productId)) {
        state.products = state.products.filter((id) => id !== productId)
      } else {
        state.products.push(productId)
      }
    },
  },
})

export const { toggleFavorite } = uiSlice.actions
export default uiSlice.reducer
