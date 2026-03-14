import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { nanoid } from "@reduxjs/toolkit";
import type { NotificationState } from "../../../Typescript/Interface/Interface";

const initialState: NotificationState = {
  count: 0,
  items: [],
};

const NotificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.count += 1;
      state.items.push({
        id: nanoid(),
        type: action.payload,
        time: Date.now(),
      });
    },

    deleteNotification: (state, action) => {
      state.items = state.items.filter(
        (elem) => elem.id !== action.payload
      );
      state.count = Math.max(0, state.count - 1);
      toast.info("Notification Removed Successfully");
    },

    clearNotification: (state) => {
      state.count = 0;
      state.items = [];
      toast.info("All Notifications Removed Successfully");
    },
  },
});

export const { addNotification, clearNotification, deleteNotification } = NotificationSlice.actions;

export default NotificationSlice.reducer;
