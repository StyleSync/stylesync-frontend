import type { ChildrenProp } from '@/modules/core/types/react.types';
import type { StylingProps, SupportedFonts } from '@/styles/styles.types';

export type TypographyVariant =
  | 'title'
  | 'subtitle'
  | 'body1'
  | 'body2'
  | 'small';

export type TypographyTag =
  | 'span'
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'p';

export type TypographyWeight =
  | 'thin'
  | 'ultralight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'black';

export type TypographyProps = Partial<ChildrenProp> &
  StylingProps & {
    variant?: TypographyVariant;
    As?: TypographyTag;
    weight?: TypographyWeight;
    font?: SupportedFonts;
  };
