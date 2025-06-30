import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ThemeState {
  mode: 'light' | 'dark'
  primaryColor: string
  locale: string
  navCollapsed: boolean
  navType: 'side' | 'top'
  direction: 'ltr' | 'rtl'
}

const initialState: ThemeState = {
  mode: 'light',
  primaryColor: '#1890ff',
  locale: 'ja_JP',
  navCollapsed: false,
  navType: 'side',
  direction: 'ltr',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload
    },
    setLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload
    },
    toggleNavCollapsed: (state) => {
      state.navCollapsed = !state.navCollapsed
    },
    setNavType: (state, action: PayloadAction<'side' | 'top'>) => {
      state.navType = action.payload
    },
    setDirection: (state, action: PayloadAction<'ltr' | 'rtl'>) => {
      state.direction = action.payload
    },
  },
})

export const { 
  setThemeMode, 
  setPrimaryColor, 
  setLocale, 
  toggleNavCollapsed, 
  setNavType, 
  setDirection 
} = themeSlice.actions
export default themeSlice.reducer