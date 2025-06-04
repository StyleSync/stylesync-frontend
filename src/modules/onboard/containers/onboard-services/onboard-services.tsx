import { type FC } from 'react';

import { useIntl } from 'react-intl';

import { ErrorBox } from '@/modules/core/components/error-box';
import { Placeholder } from '@/modules/core/components/placeholder';
import { Spinner } from '@/modules/core/components/spinner';
import { OnboardLayout } from '@/modules/onboard/components/onboard-layout';
import type { ProOnboardStepProps } from '@/modules/onboard/containers/pro-onboard/pro-onboard.interface';
import { ProfessionalServicesForm } from '@/modules/service/containers/professional-services-form';
import { useServiceOnProfessionalGroups } from '@/modules/service/hooks/use-service-on-professional-groups';

export const OnboardServices: FC<ProOnboardStepProps> = ({ next, back }) => {
  const intl = useIntl();

  const { groups, setGroups, isGroupsLoading, isGroupsLoadingError } =
    useServiceOnProfessionalGroups();

  return (
    <OnboardLayout
      meta={{
        title: intl.formatMessage({ id: 'onboard.services.title' }),
      }}
      nextButtonProps={{
        onClick: next,
      }}
      prevButtonProps={{
        onClick: back,
      }}
    >
      <Placeholder
        isActive={isGroupsLoading}
        placeholder={<Spinner size='medium' />}
      >
        <Placeholder
          isActive={isGroupsLoadingError}
          placeholder={
            <ErrorBox
              title={intl.formatMessage({ id: 'onboard.errorBox.title' })}
              description={intl.formatMessage({
                id: 'onboard.errorBox.description',
              })}
            />
          }
        >
          <ProfessionalServicesForm
            serviceOnProfessionalGroups={groups}
            setServiceOnProfessionalGroups={setGroups}
          />
        </Placeholder>
      </Placeholder>
    </OnboardLayout>
  );
};
