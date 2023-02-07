import { configureStore, combineReducers } from '@reduxjs/toolkit';
import dataOrderReducer from './dataOrder';
//admin
import userReducerAdmin from './useReduxAdmin';
import productReducerAdmin from './productReduxAdmin';
import orderReducerAdmin from './orderReduxAdmin';
import usersReducerAdmin from './usersReduxAdmin';
import productReviewReducerAdmin from './productReviewReduxAdmin';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
  key: 'root',
  storage
};
const rootReducer = combineReducers({
  dataOrder: dataOrderReducer,
  //admin
  userAdmin: userReducerAdmin,
  usersAdmin: usersReducerAdmin,
  productAdmin: productReducerAdmin,
  orderAdmin: orderReducerAdmin,
  productReviewAdmin: productReviewReducerAdmin
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export let persistor = persistStore(store);
