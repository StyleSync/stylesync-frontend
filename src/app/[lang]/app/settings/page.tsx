'use client';
// containers
import { ProfileSettingsContent } from '@/modules/user/containers/profile-settings-content';
import { ProfessionalSettingsSidebar } from '@/modules/settings/containers/professional-settings-sidebar';
// layouts
import { PageLayout } from '@/modules/core/layouts/page-layout';

export default function Settings() {
  return (
    <PageLayout sidebar={<ProfessionalSettingsSidebar />}>
      <ProfileSettingsContent />
    </PageLayout>
  );
}
