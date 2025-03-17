import { createStore, applyMiddleware, compose, Store } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rootReducer } from './root.reducer'; // Adjust path if needed
import { loggerMiddleware } from './middleware/logger'; // Adjust path if needed

// Configuration for Redux Persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['user'], // Reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Middleware setup
const middlewares = [];

// Add logger middleware in non-production environment
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(loggerMiddleware);
}

// Create the Redux store
export const store: Store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(...middlewares)
    // Other enhancers can be added here as needed
  )
);

// Create the Redux persistor
export const persistor = persistStore(store);
