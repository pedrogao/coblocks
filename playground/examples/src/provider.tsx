import { createHocuspocusProvider } from "@hocuspocus/react";

const url = "ws://localhost:1234";
const name = "test-room-1";
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdG9ySWQiOiIxIiwicHJvamVjdElkIjoiMSIsImlhdCI6MTcwMTIzOTM3OCwiZXhwIjoxNzAxMzI1Nzc4fQ.mhbnSjZnl-5rir4a9IZVUeI_1hXcn60_2w311qP5uyA`;

const { HocuspocusContextProvider, useHocuspocusProvider } = createHocuspocusProvider({
  url,
  name,
  token,
});

export { HocuspocusContextProvider, useHocuspocusProvider };
