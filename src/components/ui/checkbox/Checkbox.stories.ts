import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Checkbox } from '@/components/ui/checkbox/Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'active', 'hover', 'focus', 'disabled'],
      control: { type: 'select' },
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean', defaultValue: 'Check-box' },
    label: { control: 'text' },
  },
  args: {
    label: 'Check-box', // Общие дефолтные аргументы для всех историй
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Checkbox',
  },
}
export const Active: Story = {
  args: {
    variant: 'active',
    children: 'Checkbox',
  },
}
export const Hover: Story = {
  args: {
    variant: 'hover',
    children: 'Checkbox',
  },
}
export const Focus: Story = {
  args: {
    variant: 'focus',
    children: 'Checkbox',
  },
}
export const Disabled: Story = {
  args: {
    variant: 'disabled',
    children: 'Checkbox',
    disabled: true,
  },
}
