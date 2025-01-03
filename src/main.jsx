import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider.jsx";
import { Provider as ReduxProvider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import { store } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <Provider>
        <App />
      </Provider>
    </ReduxProvider>
  </StrictMode>
);
