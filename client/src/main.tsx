import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageProvider } from "./contexts/Language.tsx";
import { MainProvider } from "./contexts/Main.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LanguageProvider>
      <MainProvider>
        <App />
      </MainProvider>
    </LanguageProvider>
  </React.StrictMode>
);
