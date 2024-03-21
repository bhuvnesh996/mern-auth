import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import universityReducer from './university/universitySlice.js';
import sessionReducer from './session/sessionSlice.js'
import courseReducer from './course/courseSlice.js'
import centerReducer from './center/centerSlice.js'
import formReducer from './form/formSlice.js'
import studentReducer from './student/studentSlice.js'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({ user: userReducer ,university:universityReducer,session:sessionReducer,course:courseReducer,center:centerReducer,form:formReducer,student:studentReducer});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    devTools:true
});

export const persistor = persistStore(store);
