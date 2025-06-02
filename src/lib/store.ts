import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./services/usersApi";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (gDM) => gDM().concat(usersApi.middleware),
});

// handy hooks (optional)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
