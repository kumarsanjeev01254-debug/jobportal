// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { 
//   persistStore, 
//   persistReducer, 
//   FLUSH, 
//   REHYDRATE, 
//   PAUSE, 
//   PERSIST, 
//   PURGE, 
//   REGISTER 
// } from 'redux-persist';

// import companyReducer from './CompanySlice';
// import jobReducer from './Jobslice';
// // 1. Import your auth/user slice reducer here (adjust path to match your folder structure)
// import authReducer from './authslice'; 

// const storage = {
//   getItem: (key) => Promise.resolve(localStorage.getItem(key)),
//   setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
//   removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
// };

// const rootReducer = combineReducers({
//   company: companyReducer,
//   job: jobReducer,
//   auth: authReducer, // 2. Add it here! This creates 'state.auth' in Redux
// });

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);

import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authslice";
import companyReducer from "./CompanySlice";
import jobReducer from "./Jobslice";

const rootReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
  job: jobReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

