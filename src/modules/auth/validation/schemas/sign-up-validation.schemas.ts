import { z } from 'zod';

import { passwordValidationSchema } from '@/modules/auth/validation/schemas/password-validation.schemas';

export const signUpFormValidationSchema = z.object({
  email: z.string().email(),
  password: passwordValidationSchema,
});
