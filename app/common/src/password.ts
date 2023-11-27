// import { verify, hash } from "argon2";

// export const verifyPassword = async (password: string, hash: string) => {
//   return verify(hash, password);
// };

// export const hashPassword = async (password: string) => {
//   return hash(password);
// };

import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

export const verifyPassword = async (password: string, hash: string) => {
  // split() returns array
  const [hashedPassword, salt] = hash.split(".");
  // we need to pass buffer values to timingSafeEqual
  const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
  // we hash the new sign-in password
  const suppliedPasswordBuf = scryptSync(password, salt, 64) as Buffer;
  // compare the new supplied password with the stored hashed password
  return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
};

export const hashPassword = async (password: string) => {
  const salt = randomBytes(16).toString("hex");
  const buf = scryptSync(password, salt, 64) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
};
