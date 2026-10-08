import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { MainRouter } from "./routes";
import { GlobalStyle } from "./global/global";
import { AuthProvider } from "./context/Auth";


function App() {
  return (
    <AuthProvider>

      <GlobalStyle />
      <MainRouter />

    </AuthProvider>
  );
}

const rootElement = createRoot(document.getElementById("root")!);

rootElement.render(<App />);
