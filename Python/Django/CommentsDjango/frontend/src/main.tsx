import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CommentsProvider } from "./contexts/CommentsContext.tsx";
import { ToastProvider } from "./contexts/ToastContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <CommentsProvider>
        <App />
      </CommentsProvider>
    </ToastProvider>
  </StrictMode>
);
