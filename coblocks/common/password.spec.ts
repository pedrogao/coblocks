import { describe, expect, it } from "@jest/globals";
import { hashPassword, verifyPassword } from "./password";

describe("Password", () => {
  it("hash & verify password", async () => {
    const password = "123456";
    const hash = await hashPassword(password);
    expect(await verifyPassword(password, hash)).toBe(true);

    for (let i = 0; i < 10; i++) {
      const password = "123456" + i;
      const hash = await hashPassword(password);
      expect(await verifyPassword(password, hash)).toBe(true);
    }
  });
});
