import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const createSecretToken = (id: string): string => {
  if (!process.env.TOKEN_KEY) {
    throw new Error("Missing TOKEN_KEY in environment variables");
  }
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60, // 3 days in seconds
  });
};

export { createSecretToken };
