import type { ReactNode } from 'react';

import type { IconName } from '@/modules/core/components/icon';
import type { PopoverProps } from '@/modules/core/components/popover/popover.interface';
import type { Locale } from '@/modules/internationalization/types/i18n.types';
export type LocaleSelectProps = {
  renderTrigger?: (props: {
    id: Locale;
    name: string;
    icon: IconName;
    isOpen: boolean;
    toggle: () => void;
  }) => ReactNode;
  popoverProps?: Partial<PopoverProps>;
};
