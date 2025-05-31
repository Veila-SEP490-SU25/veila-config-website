import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const _store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

setupListeners(_store.dispatch);

export type RootState = ReturnType<typeof _store.getState>;
export type AppDispatch = typeof _store.dispatch;

export const store = _store;
