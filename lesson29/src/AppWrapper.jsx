import { App } from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store";

export function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
