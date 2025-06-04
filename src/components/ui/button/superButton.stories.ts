import { Meta } from '@storybook/nextjs-vite'
import { SuperButton } from '@/components/ui/button/superButton'

const meta = {
  component: SuperButton,
} satisfies Meta<typeof SuperButton>
export default meta

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
}
export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
}
export const Outline = {
  args: {
    variant: 'outline',
    children: 'Button',
  },
}
export const Text = {
  args: {
    variant: 'text',
    children: 'Button',
  },
}

// variant: 'primary' | 'secondary' | 'outline' | 'text',
