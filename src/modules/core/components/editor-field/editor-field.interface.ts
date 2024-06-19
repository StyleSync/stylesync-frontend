export type EditorProps = {
  id: string;
  value?: string;
  onChange?: (data: string) => void;
  readOnly?: boolean;
  fixedHeight?: number;
  label?: string;
};
