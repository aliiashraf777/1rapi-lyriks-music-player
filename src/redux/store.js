import { configureStore } from '@reduxjs/toolkit';
 
import playerReducer from './features/playerSlice';
import { shazamCoreApi } from './services/shazamCore';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,

    player: playerReducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,

  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreApi.middleware),
});
