import type { Meta, StoryObj } from '@storybook/react';

import { ServiceOnProfessionalEditForm } from './service-on-professional-edit-form';

const meta: Meta<typeof ServiceOnProfessionalEditForm> = {
  title: 'Service UI/ServiceOnProfessionalEditForm',
  component: ServiceOnProfessionalEditForm,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ServiceOnProfessionalEditForm>;

export const Base: Story = {};
