'use client';
// components
import { Button } from '@/modules/core/components/button';
import { AboutProfessionalForm } from '@/modules/user/components/about-professional-form';
import { ProfessionalGalleryForm } from '@/modules/user/components/professional-gallery-form';
import { ProfessionalServicesForm } from '@/modules/service/containers/professional-services-form';
import { ProfessionalScheduleForm } from '@/modules/schedule/containers/professional-schedule-form';
import { UserLocationSelectForm } from '@/modules/location/containers/user-location-select-form';
// hooks
import { useQueryParams } from '@/modules/core/hooks/use-search-params';

export default function ProfileSettingsAbout() {
  const { queryParams } = useQueryParams<{ step: string }>();
  const initialTab = 'about';
  // memo
  const activeTab = queryParams.step ?? initialTab;

  return (
    <>
      {activeTab === 'about' && (
        <>
          <AboutProfessionalForm />
          <Button text='Save' variant='primary' />
        </>
      )}
      {activeTab === 'portfolio' && (
        <>
          <ProfessionalGalleryForm />
          <Button text='Save' variant='primary' />
        </>
      )}
      {activeTab === 'services' && (
        <>
          <ProfessionalServicesForm />
          <Button text='Save' variant='primary' />
        </>
      )}
      {activeTab === 'schedule' && (
        <>
          <ProfessionalScheduleForm />
        </>
      )}
      {activeTab === 'location' && (
        <>
          <UserLocationSelectForm />
        </>
      )}
    </>
  );
}
