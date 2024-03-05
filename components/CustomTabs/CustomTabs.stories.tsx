// CustomTabs.stories.tsx

import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import CustomTabs, { CustomTabProps } from './CustomTabs'; // Import the CustomTabs component

export default {
  title: 'Components/CustomTabs', 
  component: CustomTabs,
} as Meta;

const Template: StoryFn<CustomTabProps> = (args) => <CustomTabs {...args} />;

export const Default = Template.bind({});

Default.args = {
  labels: [], 
  value: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (event: React.SyntheticEvent, newValue: number) => {},
};


