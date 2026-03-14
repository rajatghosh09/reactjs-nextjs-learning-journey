import type { store } from "../../Hooks/ReduxToolkit/store/store"

export type Rootstate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch