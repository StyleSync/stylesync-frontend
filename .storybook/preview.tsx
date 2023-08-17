import type { Preview } from '@storybook/react';
// providers
import { IntlProvider } from '@/modules/internationalization/containers/intl-provider';
// base locale
import en from '@/modules/internationalization/dictionaries/en.json';

import '@/styles/globals.scss';

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
        <Story />
      </IntlProvider>
    ),
  ],
};

export default preview;
