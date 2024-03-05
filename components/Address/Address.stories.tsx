import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Address from './Address';

export default {
  component: Address,
  title: 'Address',
} as Meta;

const Template: StoryFn = () => <Address />;

export const Default: StoryFn = Template.bind({});
