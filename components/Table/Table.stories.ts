import type { Meta, StoryObj } from '@storybook/react';

import  Example  from './NewTable';


const meta: Meta<typeof Example> = {
  title: 'Components/NewTable',
  component: Example,
  tags: ['autodocs'],
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<typeof Example>;

export const NewTable: Story = {
  args: {
    
  },
};

