import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import KeepMountedModal, { ModalCompProps } from './CustomModal';
// git push
export default {
  title: 'KeepMountedModal',
  component: KeepMountedModal,
} as Meta;

const Template: StoryFn<ModalCompProps> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <KeepMountedModal {...args} open={open} setOpen={setOpen}>
        {/* Add your modal content here */}
        <h2 id="keep-mounted-modal-title">Modal Title</h2>
        <p id="keep-mounted-modal-description">Modal Content</p>
      </KeepMountedModal>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: (
    <div>
      {/* Add your modal content here */}
      <h2 id="keep-mounted-modal-title">Modal Title</h2>
      <p id="keep-mounted-modal-description">Modal Content</p>
    </div>
  ),
  open: false,
  setOpen: action('setOpen'),
};
