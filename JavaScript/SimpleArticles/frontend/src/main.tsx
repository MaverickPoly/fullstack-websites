import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/auth.context.tsx";
import { ArticleProvider } from "./context/article.context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ArticleProvider>
        <App />
      </ArticleProvider>
    </AuthProvider>
  </StrictMode>,
);
