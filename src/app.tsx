import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { MainRouter } from "./routes";
import { GlobalStyle } from "./global/global";
import { AuthProvider } from "./context/Auth";
import { App } from 'antd'


function AppMain() {
  return (
    <AuthProvider>

      <GlobalStyle />
      <App>
        <MainRouter />
      </App>

    </AuthProvider>
  );
}

const rootElement = createRoot(document.getElementById("root")!);

rootElement.render(<AppMain />);
