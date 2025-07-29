export type ClientSelectorProps = {
  onSelect?: () => void;
  selectedClient?: {
    id: string;
    name: string;
    avatar?: string;
  } | null;
  placeholder?: string;
  disabled?: boolean;
};
