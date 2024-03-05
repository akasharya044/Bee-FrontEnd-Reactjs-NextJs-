import Loader from './Loader';
import { Meta, Story } from '@storybook/react';
export default {
  title: 'Components/Loader',
  component: Loader,
} as Meta;

const Template: Story = (args) => <Loader {...args} />;

export const input_loader = Template.bind({});

input_loader.args = {
  size: 60,
};
