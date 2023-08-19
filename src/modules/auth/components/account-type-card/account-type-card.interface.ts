import type { EmojiName } from '@/modules/core/components/emoji/emoji';
import type { AccountType } from '@/modules/user/types/account.types';

export type AccountTypeCardProps = {
  title: string;
  description: string;
  emoji: EmojiName;
  value: AccountType;
  onClick?: () => void;
  badge?: string;
  disabled?: boolean;
};
