import { authApi, profileApi, recordApi, userApi } from "@/services/apis";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const _store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [recordApi.reducerPath]: recordApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      profileApi.middleware,
      recordApi.middleware
    ),
});

setupListeners(_store.dispatch);

export type RootState = ReturnType<typeof _store.getState>;
export type AppDispatch = typeof _store.dispatch;

export const store = _store;
