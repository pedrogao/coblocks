import { createHocuspocusProvider } from "@hocuspocus/react";

const url = "ws://127.0.0.1:1234";
const name = "hocuspocus-demo";

const { HocuspocusContextProvider, useHocuspocusProvider } = createHocuspocusProvider({
  url,
  name,
});

export { HocuspocusContextProvider, useHocuspocusProvider };
