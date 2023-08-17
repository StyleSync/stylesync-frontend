export type SignUpStepValue = 'account-type' | 'credentials';

export type SignUpStep = {
  value: SignUpStepValue;
  text: string;
};
