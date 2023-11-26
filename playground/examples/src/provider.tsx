import { createHocuspocusProvider } from "@hocuspocus/react";

const url = "ws://localhost:1234";
const name = "hocuspocus-demo";

const { HocuspocusContextProvider, useHocuspocusProvider } = createHocuspocusProvider({
  url,
  name,
});

export { HocuspocusContextProvider, useHocuspocusProvider };
