import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchBook:false,
  addBook:false,
  editMode:false,
  deleteBook:false,
  bookData:{}
}

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setAddBookOpen: (state) => {
      return {
        ...state,
        addBook: true
      }
    },
    setAddBookClose: (state) => {
      return {
        ...state,
        addBook: false
      }
    },
    setEditModeOpen: (state) => {
      return {
        ...state,
        editMode: true
      }
    },
    setEditModeClose: (state) => {
      return {
        ...state,
        editMode: false
      }
    },
    setDeleteBookOpen: (state) => {
      return {
        ...state,
        deleteBook: true
      }
    },
    setDeleteBookClose: (state) => {
      return {
        ...state,
        deleteBook: false
      }
    },
    setSearchBookOpen: (state) => {
      return {
        ...state,
        searchBook: true
      }
    },
    setSearchBookClose: (state) => {
      return {
        ...state,
        searchBook: false
      }
    },
    setAddBookData : (state,data) => {
      return {
        ...state,
        bookData: data?.payload
      }
    },
    closeAddBookData : (state,action) => {
      console.log(action)
      return {
        ...state,
        bookData: {}
      }
    }
  }
})

export const { setSearchBookOpen, setSearchBookClose, setAddBookOpen, setAddBookClose, setAddBookData, closeAddBookData, setDeleteBookOpen, setDeleteBookClose,setEditModeOpen, setEditModeClose } = bookSlice.actions

export default bookSlice.reducer