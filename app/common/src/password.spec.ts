/* eslint-disable */
import { describe, expect, it } from "@jest/globals";
import { hashPassword, verifyPassword } from "./password";

describe("Password", () => {
  it("hash & verify password", async () => {
    const password = "123456";
    const hash = await hashPassword(password);
    expect(await verifyPassword(password, hash)).toBe(true);

    // for (let i = 0; i < 10; i++) {
    //   const password = `123456${i}`;
    //   const hash = await hashPassword(password);
    //   expect(await verifyPassword(password, hash)).toBe(true);
    // }
  });

  it("verify wrong password", async () => {
    const hashed =
      "$argon2id$v=19$m=65536,t=3,p=4$OWaXCkdnTCJQH3ODcO2ZtQ$fB3PA3U48tfYkYIX5r7943Y8mJvxi1dTKJeHF0/eWvA";
    expect(await verifyPassword("123456", hashed)).toBe(false);
  });
});
