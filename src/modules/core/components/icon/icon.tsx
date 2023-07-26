import { type FC, memo } from 'react';
// icons
import PhoneIcon from '@/assets/icons/phone.svg?icon';
import ImageNotFoundIcon from '@/assets/icons/image-not-found.svg?icon';
import BeautyServiceIcon from '@/assets/icons/beauty-service.svg?icon';
import CalendarIcon from '@/assets/icons/calendar.svg?icon';
import ImageIcon from '@/assets/icons/image.svg?icon';
import InfoIcon from '@/assets/icons/info.svg?icon';
import LocationIcon from '@/assets/icons/location.svg?icon';
import StarIcon from '@/assets/icons/star.svg?icon';
import HeartIcon from '@/assets/icons/heart.svg?icon';
import CheckMarkIcon from '@/assets/icons/check-mark.svg?icon';
import HaircutIcon from '@/assets/icons/haircut.svg?icon';
import MakeupIcon from '@/assets/icons/makup.svg?icon';
import NailsIcon from '@/assets/icons/nails.svg?icon';
import CloseIcon from '@/assets/icons/close.svg?icon';
import PencilIcon from '@/assets/icons/pencil.svg?icon';

import type { SVGComponentElement } from './icon.interface';

export const icons = {
  phone: PhoneIcon,
  'image-not-found': ImageNotFoundIcon,
  'beauty-service': BeautyServiceIcon,
  calendar: CalendarIcon,
  info: InfoIcon,
  image: ImageIcon,
  location: LocationIcon,
  star: StarIcon,
  heart: HeartIcon,
  'check-mark': CheckMarkIcon,
  close: CloseIcon,
  pencil: PencilIcon,
  haircut: HaircutIcon,
  makeup: MakeupIcon,
  nails: NailsIcon,
} satisfies Record<string, FC<SVGComponentElement>>;

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
} & SVGComponentElement;

const Icon: FC<IconProps> = memo(({ name, ...props }) => {
  const IconElement = icons[name];

  if (!IconElement) {
    const ImageNotFoundIconElement = icons['image-not-found'];

    return <ImageNotFoundIconElement {...props} />;
  }

  return <IconElement {...props} />;
});

Icon.displayName = 'Icon';

export { Icon };
