import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist"; // Corrected spelling here
import storage from "redux-persist/lib/storage";
import userSlice from "../features/userSlice";

import chatSlice from "../features/chatSlice";

import { createFilter } from "redux-persist-transform-filter"; // Ensure this is also imported

// SavedUserOnlyFilter
const savedUserOnlyFilter = createFilter("user", ["user"]);

// Persist config
const persistConfig = {
    key: "user",
    storage,
    whitelist: ["user"],
    transforms: [savedUserOnlyFilter],
};

const rootReducer = combineReducers({
    user: userSlice,
    chat: chatSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: true,
});

export const persistor = persistStore(store); // Corrected spelling here
