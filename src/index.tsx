import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-sgxjgc87tlf6cgg5.eu.auth0.com"
      clientId="KJk9VJyVkpytcxdMsiBU6hGTothL9lJO"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://music-api",
        scope: "openid profile email",
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
