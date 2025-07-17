// lib/users.ts
import bcrypt from "bcryptjs";

type User = {
  email: string;
  passwordHash: string;
};

const users: User[] = []; // temporairement en mémoire

export function createUser(email: string, password: string): boolean {
  const existing = users.find((user) => user.email === email);
  if (existing) return false;

  const passwordHash = bcrypt.hashSync(password, 10);
  users.push({ email, passwordHash });
  return true;
}

export function validateUser(email: string, password: string): boolean {
  const user = users.find((u) => u.email === email);
  if (!user) return false;
  return bcrypt.compareSync(password, user.passwordHash);
}
