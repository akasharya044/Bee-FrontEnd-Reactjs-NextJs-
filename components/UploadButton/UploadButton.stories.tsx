// UploadButton.stories.tsx
import React from 'react';
import UploadButton, { UploadButtonProps } from './UploadButton';
import { StoryFn, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/UploadButton',
  component: UploadButton,
  argTypes: {
    onFileSelect: { action: 'file-selected' },
    accept: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<UploadButtonProps> = (args) => <UploadButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  onFileSelect: action('file-selected'), 
  accept: '*', // Accepts all file types by default
};

export const ImagesOnly = Template.bind({});
ImagesOnly.args = {
  ...Default.args,
  accept: 'image/*', 
};
