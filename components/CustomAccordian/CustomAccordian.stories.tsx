
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import CustomAccordian,{ AccordionListProps } from '././CustomAccordian';


export default {
  title: 'Material-UI/AccordionList',
  component: CustomAccordian,
  argTypes: {
    accordions: {
      control: 'object',
    },
  },
} as Meta;

const Template: StoryFn<AccordionListProps> = (args) => <CustomAccordian {...args} />;

export const DefaultAccordionList = Template.bind({});
DefaultAccordionList.args = {
  accordions: [
    { title: 'Accordion 1', content: 'Content for Accordion 1' },
    { title: 'Accordion 2', content: 'Content for Accordion 2' },
    { title: 'Accordion 3', content: 'Content for Accordion 3' },
  ],
};
