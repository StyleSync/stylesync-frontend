import type { ReactNode } from 'react';

export type ProfileSectionLayoutProps = {
  children: ReactNode;
  title: string;
  id?: string;
  edit?: boolean;
  onEdit?: () => void;
  onCancel?: () => void;
  formId?: string;
  onSave?: () => void;
  headerActions?: ReactNode;
};
