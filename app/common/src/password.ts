import { verify, hash } from "argon2";

export const verifyPassword = async (password: string, hash: string) => {
  return verify(hash, password);
};

export const hashPassword = async (password: string) => {
  return hash(password);
};
