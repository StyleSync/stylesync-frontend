export type ErrorViewProps = {
  className?: string;
  title: string;
  description: string;
  errorCode?: string | number;
  primaryAction?: {
    text: string;
    onClick: () => void;
  };
  secondaryAction?: {
    text: string;
    onClick: () => void;
  };
};
