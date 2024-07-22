import type { Meta, StoryObj } from '@storybook/react';

import { ProfessionalSearchCard } from './professional-search-card';

const meta: Meta<typeof ProfessionalSearchCard> = {
  title: 'User UI/ProfessionalSearchCard',
  component: ProfessionalSearchCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ProfessionalSearchCard>;

export const Base: Story = {};
