export type SignUpStep = 'account-type' | 'credentials';

export type SignUpUserData = {
  email: string;
  password: string;
  isTermsAgreed: boolean;
};
