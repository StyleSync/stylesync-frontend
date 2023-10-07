import type { Preview } from '@storybook/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// providers
import { IntlProvider } from '@/modules/internationalization/containers/intl-provider';
// base locale
import en from '@/modules/internationalization/dictionaries/en.json';

import '@/styles/globals.scss';

const queryClient = new QueryClient();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <IntlProvider locale='en' dictionary={en}>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </IntlProvider>
    ),
  ],
};

export default preview;
