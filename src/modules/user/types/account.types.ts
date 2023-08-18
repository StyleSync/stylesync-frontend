import type { EmojiName } from '@/modules/core/components/emoji/emoji';

export type AccountType = 'professional' | 'client';

export type AccountTypeDisplayData = {
  title: string;
  emoji: EmojiName;
  description: string;
  badge?: string;
  disabled?: boolean;
};
