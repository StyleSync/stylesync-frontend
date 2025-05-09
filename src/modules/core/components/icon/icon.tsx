import { type FC, memo } from 'react';

import AlarmIcon from '@/assets/icons/alarm.svg?icon';
import AlertTriangleIcon from '@/assets/icons/alert-triangle.svg?icon';
import AppleLogoLanding from '@/assets/icons/apple-logo-landing.svg?icon';
import ArrowBottomIcon from '@/assets/icons/arrow-bottom.svg?icon';
import ArrowIncrease from '@/assets/icons/arrow-increase.svg?icon';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg?icon';
import ArowLeftCurved from '@/assets/icons/arrow-left-curved.svg?icon';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg?icon';
import ArrowTopIcon from '@/assets/icons/arrow-top.svg?icon';
import BeautyServiceIcon from '@/assets/icons/beauty-service.svg?icon';
import CalendarIcon from '@/assets/icons/calendar.svg?icon';
import CheckMarkIcon from '@/assets/icons/check-mark.svg?icon';
import ChevronBottomIcon from '@/assets/icons/chevron-bottom.svg?icon';
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg?icon';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg?icon';
import ChevronTopIcon from '@/assets/icons/chevron-top.svg?icon';
import Clipboard from '@/assets/icons/clipboard.svg?icon';
import CloseIcon from '@/assets/icons/close.svg?icon';
import CommentIcon from '@/assets/icons/comment.svg?icon';
import CopyIcon from '@/assets/icons/copy.svg?icon';
import CornerIcon from '@/assets/icons/corner.svg?icon';
import EyeIcon from '@/assets/icons/eye.svg?icon';
import EyeNoIcon from '@/assets/icons/eye-no.svg?icon';
import Eyebrows from '@/assets/icons/eyebrows.svg?icon';
import FaceMassage from '@/assets/icons/face-massage.svg?icon';
import FacebookIcon from '@/assets/icons/facebook.svg?icon';
import FacebookLanding from '@/assets/icons/facebook-landing.svg?icon';
import FacebookLogoIcon from '@/assets/icons/facebook-logo.svg?icon';
import Filter from '@/assets/icons/filter.svg?icon';
import Fitness from '@/assets/icons/fitness.svg?icon';
import FlagEurope from '@/assets/icons/flag-europe.svg?icon';
import FlagUkraine from '@/assets/icons/flag-ukraine.svg?icon';
import FlagUSA from '@/assets/icons/flag-usa.svg?icon';
import FolderIcon from '@/assets/icons/folder.svg?icon';
import GmailLogoIcon from '@/assets/icons/gmail-logo.svg?icon';
import GoogleLogoIcon from '@/assets/icons/google-logo.svg?icon';
import GoogleLogoLanding from '@/assets/icons/google-play-logo.svg?icon';
import HaircutIcon from '@/assets/icons/haircut.svg?icon';
import HeartIcon from '@/assets/icons/heart.svg?icon';
import Parmanent from '@/assets/icons/highlighter.svg?icon';
import HorizontalPoints from '@/assets/icons/horizontal-points.svg?icon';
import ImageIcon from '@/assets/icons/image.svg?icon';
import ImageNotFoundIcon from '@/assets/icons/image-not-found.svg?icon';
import InBoxIcon from '@/assets/icons/inbox.svg?icon';
import InfoIcon from '@/assets/icons/info.svg?icon';
import InstagramIcon from '@/assets/icons/instagram.svg?icon';
import InstagramLanding from '@/assets/icons/instagram-landing.svg?icon';
import InstagramLogoIcon from '@/assets/icons/instagram-logo.svg?icon';
import InstagramLogoCircleContainedIcon from '@/assets/icons/instagram-logo-circle-contained.svg?icon';
import Lips from '@/assets/icons/lips.svg?icon';
import List from '@/assets/icons/list.svg?icon';
import LocationIcon from '@/assets/icons/location.svg?icon';
import LogOutIcon from '@/assets/icons/log-out.svg?icon';
import LogoLanding from '@/assets/icons/logo-landing.svg?icon';
import MakeupIcon from '@/assets/icons/makup.svg?icon';
import MediaIcon from '@/assets/icons/media.svg?icon';
import MenuIcon from '@/assets/icons/menu.svg?icon';
import MessengerLogoIcon from '@/assets/icons/messenger-logo.svg?icon';
import MinusIcon from '@/assets/icons/minus.svg?icon';
import NailsIcon from '@/assets/icons/nails.svg?icon';
import PencilIcon from '@/assets/icons/pencil.svg?icon';
import PhoneIcon from '@/assets/icons/phone.svg?icon';
import PlusIcon from '@/assets/icons/plus.svg?icon';
import Profile from '@/assets/icons/profile.svg?icon';
import PsychologyIcon from '@/assets/icons/psycholog.svg?icon';
import QuestionIcon from '@/assets/icons/question.svg?icon';
import RefreshCcwIcon from '@/assets/icons/refresh-ccw.svg?icon';
import SearchIcon from '@/assets/icons/search.svg?icon';
import SettingsIcon from '@/assets/icons/settings.svg?icon';
import ShareIcon from '@/assets/icons/share.svg?icon';
import ShieldIcon from '@/assets/icons/shield.svg?icon';
import Skincare from '@/assets/icons/skincare.svg?icon';
import StarIcon from '@/assets/icons/star.svg?icon';
import StyleSyncLogoIcon from '@/assets/icons/stylesync-logo.svg?icon';
import SuccessIcon from '@/assets/icons/success.svg?icon';
import Tiktok from '@/assets/icons/tiktok.svg?icon';
import TimeIcon from '@/assets/icons/time.svg?icon';
import TrashIcon from '@/assets/icons/trash.svg?icon';
import UserIcon from '@/assets/icons/user.svg?icon';
import ViberLogoIcon from '@/assets/icons/viber-logo.svg?icon';
import XLanding from '@/assets/icons/x-landing.svg?icon';

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
  psychology: PsychologyIcon,
  plus: PlusIcon,
  minus: MinusIcon,
  user: UserIcon,
  'arrow-right': ArrowRightIcon,
  'arrow-left': ArrowLeftIcon,
  'arrow-bottom': ArrowBottomIcon,
  'arrow-top': ArrowTopIcon,
  'chevron-right': ChevronRightIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-bottom': ChevronBottomIcon,
  'chevron-top': ChevronTopIcon,
  'stylesync-logo': StyleSyncLogoIcon,
  eye: EyeIcon,
  'eye-no': EyeNoIcon,
  'google-logo': GoogleLogoIcon,
  'facebook-logo': FacebookLogoIcon,
  'messenger-logo': MessengerLogoIcon,
  'instagram-logo': InstagramLogoIcon,
  'instagram-logo-circle-contained': InstagramLogoCircleContainedIcon,
  'gmail-logo': GmailLogoIcon,
  'viber-logo': ViberLogoIcon,
  trash: TrashIcon,
  time: TimeIcon,
  'flag-ukraine': FlagUkraine,
  'flag-usa': FlagUSA,
  'flag-europe': FlagEurope,
  points: HorizontalPoints,
  list: List,
  inbox: InBoxIcon,
  folder: FolderIcon,
  copy: CopyIcon,
  settings: SettingsIcon,
  'log-out': LogOutIcon,
  'alert-triangle': AlertTriangleIcon,
  'refresh-ccw': RefreshCcwIcon,
  'profile-circle': Profile,
  shield: ShieldIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  alarm: AlarmIcon,
  corner: CornerIcon,
  menu: MenuIcon,
  share: ShareIcon,
  comment: CommentIcon,
  facebookLanding: FacebookLanding,
  xLanding: XLanding,
  instagramLanding: InstagramLanding,
  logoLanding: LogoLanding,
  appleLogoLanding: AppleLogoLanding,
  googleLogoLanding: GoogleLogoLanding,
  success: SuccessIcon,
  'arrow-increase': ArrowIncrease,
  media: MediaIcon,
  search: SearchIcon,
  fitness: Fitness,
  faceMassage: FaceMassage,
  filter: Filter,
  eyebrows: Eyebrows,
  skincare: Skincare,
  qustion: QuestionIcon,
  tiktok: Tiktok,
  clipboard: Clipboard,
  'parmanent-makeup': Parmanent,
  lips: Lips,
  'arrow-left-curved': ArowLeftCurved,
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
