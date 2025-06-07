import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Checkbox } from '@/components/ui/checkbox/Checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    variant: {
      options: ['default', 'active', 'hover', 'focus', 'disabled'],
      control: { type: 'radio' },
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Checkbox>

export default meta

export const Default: StoryObj<typeof meta> = {
  args: {
    variant: 'default',
    label: 'Primary Checkbox',
  },
}
