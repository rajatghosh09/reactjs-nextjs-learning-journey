import { configureStore } from "@reduxjs/toolkit";
import NotificationReducer from "../Slice/NotificationSlice"
export const store = configureStore({
    reducer: {
        notifications: NotificationReducer
    }
})