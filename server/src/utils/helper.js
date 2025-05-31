import { customAlphabet } from 'nanoid';

const alphanumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphanumeric, 8);

export const generateOrderId = () => {
  return `ORD-${nanoid()}`;
};


export function requireEnv(varName) {
  const value = process.env[varName];
  if (!value) {
    throw new Error(`Environment variable ${varName} is required but was not provided.`);
  }
  return value;
}