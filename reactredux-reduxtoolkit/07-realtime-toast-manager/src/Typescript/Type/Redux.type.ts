import { store } from "../../Hooks/Redux-Toolkit/Store/Store";

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
