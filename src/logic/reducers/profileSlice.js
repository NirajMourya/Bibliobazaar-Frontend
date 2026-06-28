import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeTab: 'account',
  addressOpen: false,
  editAddress: {}
}

export const userSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setTab: (state, action) => {
      return {
        ...state,
        activeTab: action.payload
      }
    },
    setAddressOpen: (state) => {
      return {
        ...state,
        addressOpen: true
      }
    },
    setAddressClose: (state) => {
      return {
        ...state,
        addressOpen: false
      }
    },
    setEditAddress: (state, action) => {
      return {
        ...state,
        editAddress: { ...action.payload }
      }
    }
  }
})

export const { setTab, setAddressOpen, setAddressClose, setEditAddress } = userSlice.actions

export default userSlice.reducer