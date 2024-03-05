import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Sidebar, { SidebarProps } from './SidebarReusable';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
} as Meta;
// git push
const Template: StoryFn<SidebarProps> = (args: SidebarProps) => <Sidebar {...args} />;

export const Default: StoryFn<SidebarProps> = Template.bind({});
