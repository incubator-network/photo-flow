
import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SuperCheckBox } from '@/app/components/ui/checkbox/superCheckbox'


const meta = {
  title: 'Components/SuperCheckbox',
  component: SuperCheckBox,
  argTypes: {
    variant: {
      options: ['default', 'active', 'hover', 'focus', 'disabled'],
      control: { type: 'radio' },
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof SuperCheckBox>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    variant: 'default',
    label: 'Primary Checkbox',
  },
};
