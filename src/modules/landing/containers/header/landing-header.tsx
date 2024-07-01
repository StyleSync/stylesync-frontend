// components
import { Header } from '@/modules/core/components/header';
import { Typography } from '@/modules/core/components/typogrpahy';
// containers
import { UserMenuBadge } from '@/modules/user/containers/user-menu-badge';

export const LandingHeader = () => {
  return (
    <Header
      className='!shadow-none'
      centralSlot={
        <nav className='hidden sm:grid justify-center'>
          <ul className=' flex sm:gap-5 md:gap-10'>
            <li>
              <a className=' hover:cursor-pointer'>
                <Typography variant='body1'>Services</Typography>
              </a>
            </li>
            <li>
              <a className=' hover:cursor-pointer'>
                <Typography variant='body1'>About Us</Typography>
              </a>
            </li>
            <li>
              <a className=' hover:cursor-pointer'>
                <Typography variant='body1'>FAQ</Typography>
              </a>
            </li>
            <li>
              <a className=' hover:cursor-pointer'>
                <Typography variant='body1'>Contact</Typography>
              </a>
            </li>
          </ul>
        </nav>
      }
      rightSlot={<UserMenuBadge />}
    />
  );
};
