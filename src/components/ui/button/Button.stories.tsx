import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Button } from '@/components/ui/button/Button'

const meta = {
  component: Button,
} satisfies Meta<typeof Button>
export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
}
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
}
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button',
  },
}
export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Button',
  },
}
export const ButtonAsLink: Story = {
  args: {
    children: <a href={'/'}>Link</a>,
    asChild: true,
  },
}

// variant: 'primary' | 'secondary' | 'outline' | 'text',
