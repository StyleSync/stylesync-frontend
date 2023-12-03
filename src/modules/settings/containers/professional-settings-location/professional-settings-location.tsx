import { type FC } from 'react';

import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';
import { UserLocationSelectForm } from '@/modules/location/containers/user-location-select-form';

export const ProfessionalSettingsLocation: FC = () => {
  return (
    <ProfileSettingsTabContentLayout
      title='Location settings'
      icon='location'
      actions={[{ text: 'Save' }]}
    >
      <UserLocationSelectForm />
    </ProfileSettingsTabContentLayout>
  );
};
