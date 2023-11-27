/* eslint-disable */
import { describe, expect, it } from "@jest/globals";
import { hashPassword, verifyPassword } from "./password";

describe("Password", () => {
  it("hash & verify password", async () => {
    const password = "123456";
    const hash = await hashPassword(password);
    expect(await verifyPassword(password, hash)).toBe(true);

    for (let i = 0; i < 100; i++) {
      const password = `123456${i}`;
      const hash = await hashPassword(password);
      expect(await verifyPassword(password, hash)).toBe(true);
    }
  });

  it("verify wrong password", async () => {
    const hashed =
      "5f65fc11ea93f87180f655614387feb32a8a512bfafe8617463d40655d964765baed9cf6408ffc5ec588f344f2826351e96ab5eb0bbd0da12683a61bb8172180.98b6f3f954cd528c6c7d4f058685376s";
    expect(await verifyPassword("123456", hashed)).toBe(false);
  });
});
