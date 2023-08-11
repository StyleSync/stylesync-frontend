import type {
  SignUpStep,
  SignUpUserData,
} from '@/modules/auth/types/sign-up.types';

export const SIGN_UP_STEPS: { value: SignUpStep; text: string }[] = [
  {
    value: 'account-type',
    text: 'Account type',
  },
  {
    value: 'credentials',
    text: 'Credentials',
  },
];

export const signUpFormDefaultValues: SignUpUserData = {
  email: '',
  password: '',
  isTermsAgreed: false,
};
