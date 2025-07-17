// lib/auth.ts

import jwt from "jsonwebtoken";

const SECRET = "freelanzo-secret"; // à cacher dans un fichier .env plus tard

export function generateToken(email: string) {
  return jwt.sign({ email }, SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { email: string };
  } catch {
    return null;
  }
}
