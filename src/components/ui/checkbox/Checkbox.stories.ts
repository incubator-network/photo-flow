import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CheckBox } from '@/components/ui/checkbox/Checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: CheckBox,
  argTypes: {
    variant: {
      options: ['default', 'active', 'hover', 'focus', 'disabled'],
      control: { type: 'radio' },
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof CheckBox>

export default meta

export const Default: StoryObj<typeof meta> = {
  args: {
    variant: 'default',
    label: 'Primary Checkbox',
  },
}
