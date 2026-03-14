import { Provider } from "react-redux";
import { store } from "../Redux-Toolkit/Store/Store";


const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
