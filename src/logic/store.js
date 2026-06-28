// import { configureStore } from '@reduxjs/toolkit'
// import userSlice from './reducers/userSlice'

// export default configureStore({
//   reducer: {
//     user: userSlice
//   },
// })

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import userSlice from './reducers/userSlice'
import bookSlice from './reducers/bookSlice'
import profileSlice from "./reducers/profileSlice";

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({ 
  user: userSlice,
  book: bookSlice,
  profile: profileSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store)
