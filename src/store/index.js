import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from "../api/api";
import profileReducer from "./Reducers/profileReducer";


const store = configureStore({
  reducer: {
    'profile': profileReducer,
    [api.reducerPath]: api.reducer,
  },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
setupListeners(store.dispatch)
export default store;