

import React from 'react'; 
import type { Meta, StoryFn } from '@storybook/react';
import LoginPage from './loginPage'; 



export default {
  title: 'Components/loginPage',
  component: LoginPage,
} as Meta;

const Template: StoryFn = () => <LoginPage handleLogin={function (e: React.FormEvent<Element>): void {
  throw new Error('Function not implemented.');
} } />;

export const Default: StoryFn = Template.bind({});
Default.args = {};
Default.storyName = 'Default LoginPage';
