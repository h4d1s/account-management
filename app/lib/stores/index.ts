import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "@/app/lib/stores/slices/accountsSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            accounts: accountsReducer
        }
    });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];