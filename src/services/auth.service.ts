import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserDAO } from '../dao/auth.dao.ts';

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const register = async (email: string, password: string, phoneNumber: string) => {
  const existingUser = await UserDAO.findByPhoneNumber(phoneNumber);
  if (existingUser) {
    throw new Error('Phone number already exists');
  }

  const existingEmail = await UserDAO.findByEmail(email);
  if (existingEmail) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserDAO.create(email, hashedPassword, phoneNumber);
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

  return { user, token };
};

export const login = async (phoneNumber: string, password: string) => {
  const existingUser = await UserDAO.findByPhoneNumber(phoneNumber);
  if (!existingUser) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.toJSON().password);
  
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ id: existingUser.id }, JWT_SECRET, { expiresIn: '1h' });
  return { user: existingUser, token };
}