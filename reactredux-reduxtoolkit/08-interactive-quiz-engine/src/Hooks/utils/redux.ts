import {useDispatch,useSelector,type TypedUseSelectorHook} from "react-redux";
import type { Rootstate } from "../../typescript/type/redux.type";


export const useAppseletor: TypedUseSelectorHook<Rootstate> = useSelector;
export const useAppdispatch = () => useDispatch();
