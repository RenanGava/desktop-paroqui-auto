import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { MainRouter } from "./routes";
import { GlobalStyle } from "./global/global";


function App() {
  return (
    <>

      <GlobalStyle />
      <MainRouter />
    
    </>
  );
}

const rootElement = createRoot(document.getElementById("root"));

rootElement.render(<App />);
