import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { Rootstate } from "../../Typescript/Type/Redux.type";

export const useAppseletor: TypedUseSelectorHook<Rootstate> = useSelector;
export const useAppdispatch = () => useDispatch();
