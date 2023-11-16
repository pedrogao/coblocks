import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.tsx";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement!).render(
  // https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
  // `StrictMode` will render twice which make
  <React.StrictMode>
    <ChakraProvider resetCSS={true}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
