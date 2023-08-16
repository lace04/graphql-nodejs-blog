import { config } from 'dotenv';

config();

export const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/graphqlblog';
export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || 'supersecretpassword';
