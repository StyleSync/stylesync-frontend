import type { Role } from '@prisma/client';

export type AccountTypeSelectProps = {
  value: Role | null;
  onChange: (value: Role) => void;
};
