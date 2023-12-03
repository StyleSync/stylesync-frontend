import type { Meta, StoryObj } from '@storybook/react';

import { ServiceOnProfessionalTableRow } from './service-on-professional-table-row';

const meta: Meta<typeof ServiceOnProfessionalTableRow> = {
  title: 'Service UI/ServiceOnProfessionalTableRow',
  component: ServiceOnProfessionalTableRow,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ServiceOnProfessionalTableRow>;

export const Base: Story = {};
