import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import store from "./app/store.js";
import { Provider } from "react-redux";

// console.log(import.meta.env.VITE_AUTHO_CLIENT_ID);
// console.log(import.meta.env.VITE_AUTHO_DOMAIN);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTHO_DOMAIN}
      clientId={import.meta.env.VITE_AUTHO_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"
    >
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
