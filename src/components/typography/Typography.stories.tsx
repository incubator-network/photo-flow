import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Typography } from '@/components/typography/Typography'

const meta = {
  component: Typography,
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>

export default meta

type Story = StoryObj<typeof meta>

export const TypographyLarge: Story = {
  args: {
    children: 'Large text',
    variant: 'large',
    className: 'text-black',
  },
}
