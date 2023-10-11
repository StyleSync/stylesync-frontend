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
import PlusIcon from '@/assets/icons/plus.svg?icon';
import MinusIcon from '@/assets/icons/minus.svg?icon';
import UserIcon from '@/assets/icons/user.svg?icon';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg?icon';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg?icon';
import ArrowBottomIcon from '@/assets/icons/arrow-bottom.svg?icon';
import ArrowTopIcon from '@/assets/icons/arrow-top.svg?icon';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg?icon';
import ChevronTopIcon from '@/assets/icons/chevron-top.svg?icon';
import ChevronBottomIcon from '@/assets/icons/chevron-bottom.svg?icon';
import StyleSyncLogoIcon from '@/assets/icons/stylesync-logo.svg?icon';
import EyeIcon from '@/assets/icons/eye.svg?icon';
import EyeNoIcon from '@/assets/icons/eye-no.svg?icon';
import GoogleLogoIcon from '@/assets/icons/google-logo.svg?icon';
import FacebookLogoIcon from '@/assets/icons/facebook-logo.svg?icon';
import InstagramLogoIcon from '@/assets/icons/instagram-logo.svg?icon';
import TrashIcon from '@/assets/icons/trash.svg?icon';
import TimeIcon from '@/assets/icons/time.svg?icon';
import FlagUkraine from '@/assets/icons/flag-ukraine.svg?icon';
import FlagUSA from '@/assets/icons/flag-usa.svg?icon';
import FlagEurope from '@/assets/icons/flag-europe.svg?icon';
import HorizontalPoints from '@/assets/icons/horizontal-points.svg?icon';
import List from '@/assets/icons/list.svg?icon';
import InBoxIcon from '@/assets/icons/inbox.svg?icon';
import SettingsIcon from '@/assets/icons/settings.svg?icon';

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
  plus: PlusIcon,
  minus: MinusIcon,
  user: UserIcon,
  'arrow-right': ArrowRightIcon,
  'arrow-left': ArrowLeftIcon,
  'arrow-bottom': ArrowBottomIcon,
  'arrow-top': ArrowTopIcon,
  'chevron-right': ChevronRightIcon,
  'chevron-bottom': ChevronBottomIcon,
  'chevron-top': ChevronTopIcon,
  'stylesync-logo': StyleSyncLogoIcon,
  eye: EyeIcon,
  'eye-no': EyeNoIcon,
  'google-logo': GoogleLogoIcon,
  'facebook-logo': FacebookLogoIcon,
  'instagram-logo': InstagramLogoIcon,
  trash: TrashIcon,
  time: TimeIcon,
  'flag-ukraine': FlagUkraine,
  'flag-usa': FlagUSA,
  'flag-europe': FlagEurope,
  points: HorizontalPoints,
  list: List,
  inbox: InBoxIcon,
  settings: SettingsIcon,
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
