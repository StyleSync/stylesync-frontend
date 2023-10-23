import type { EmojiName } from '@/modules/core/components/emoji/emoji';
import type { Role } from '@prisma/client';

export type AccountTypeCardProps = {
  title: string;
  description: string;
  emoji: EmojiName;
  value: Role;
  onClick?: () => void;
  badge?: string;
  disabled?: boolean;
};
