import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Card } from '@/components/ui/Card/Card'

const meta = {
  component: Card,
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const CardStory: Story = {
  args: {
    className: 'w-40 h-40 m-10',
  },
}
