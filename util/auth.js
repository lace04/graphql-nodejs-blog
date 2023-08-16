import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const createToken = (user) => {
  return jwt.sign({ user }, JWT_SECRET, {
    expiresIn: 60 * 60 * 24,
  });
};

//este archivo es para crear el token y que expire en una hora
