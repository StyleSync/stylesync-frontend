import { type FC } from 'react';
// components
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';
// containers
import { UserLocationSelectForm } from '@/modules/location/containers/user-location-select-form';

export const ProfessionalLocationSettings: FC = () => {
  return (
    <ProfileSettingsTabContentLayout
      title='Location settings'
      icon='location'
      actions={[
        {
          text: 'Save',
        },
      ]}
    >
      <UserLocationSelectForm />
    </ProfileSettingsTabContentLayout>
  );
};
