import type { Meta, StoryObj } from '@storybook/react';
import { CustomText } from './CustomText';

const meta = {
  title: 'Basic/Title',
  component: CustomText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'CustomText',
  },
};
