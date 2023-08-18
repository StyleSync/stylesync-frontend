import { z } from 'zod';

export const uppercaseCharacterRegex = /[A-Z]/;
export const lowercaseCharacterRegex = /[a-z]/;
export const digitRegex = /[0-9]/;
export const passwordMinLength = 8;

export const passwordValidationSchema = z
  .string()
  .min(passwordMinLength)
  .regex(uppercaseCharacterRegex)
  .regex(lowercaseCharacterRegex)
  .regex(digitRegex);
