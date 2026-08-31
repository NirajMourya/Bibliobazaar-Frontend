import { createSlice } from '@reduxjs/toolkit'

const getDefaultMode = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

const initialState = {
  mode: getDefaultMode()
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleThemeMode: (state) => {
      return {
        ...state,
        mode: state.mode === 'dark' ? 'light' : 'dark'
      }
    },
    setThemeMode: (state, action) => {
      return {
        ...state,
        mode: action.payload
      }
    }
  }
})

export const { toggleThemeMode, setThemeMode } = uiSlice.actions

export default uiSlice.reducer
