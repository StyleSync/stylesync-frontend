// containers
// layouts
import { PageLayout } from '@/modules/core/layouts/page-layout';
import { pageGuard } from '@/modules/core/utils/route.utils';
import { ProfessionalSettingsSidebar } from '@/modules/settings/containers/professional-settings-sidebar';
import { ProfileSettingsContent } from '@/modules/user/containers/profile-settings-content';

export default async function Settings() {
  await pageGuard({
    require: {
      onboarding: true,
      userType: true,
    },
  });

  return (
    <PageLayout sidebar={<ProfessionalSettingsSidebar />}>
      <ProfileSettingsContent />
    </PageLayout>
  );
}
