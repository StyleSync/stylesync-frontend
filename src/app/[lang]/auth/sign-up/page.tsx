// containers
import { SignUpForm } from '@/modules/auth/containers/sign-up-form';
import { IntlProvider } from '@/modules/internationalization/containers/intl-provider';
// utils
import { getDictionary } from '@/modules/internationalization/utils/dictionary.utils';
// types
import type { PageParams } from '@/modules/core/types/next.types';

export default async function Page({ params }: PageParams) {
  const dictionary = await getDictionary(params.lang);

  return (
    <IntlProvider locale={params.lang} dictionary={dictionary}>
      <SignUpForm />
    </IntlProvider>
  );
}
