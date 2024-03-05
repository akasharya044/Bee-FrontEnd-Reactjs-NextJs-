import type { Meta, StoryObj } from '@storybook/react';
 import ReusableSelect from './MultiSelect';

const meta: Meta<typeof ReusableSelect> = {
  title: 'Example/IconSelect',
  component: ReusableSelect,
  tags: ['autodocs'],
 
};

export default meta;
type Story = StoryObj<typeof ReusableSelect>;


export const Primary: Story = {
  args: {
    label:"My select",
    options:[{id:'1',name:'option1'},
    {id:'2',name:'option2'},
    {id:'3',name:'option3'},
        
       
      ],
      disabled:false,
      value: [
        'option1',
        'option2',
        'option3',
      ],
      onChange:() => {},
  },
  
};