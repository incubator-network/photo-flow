import { Meta } from '@storybook/nextjs-vite'
import {SuperButton} from '@/components/ui/button/superButton'

const meta = {
  component: SuperButton,
} satisfies Meta<typeof SuperButton>
export default meta

export const Button = {

  args: {
    variant: 'primary',
    children: 'Button',

  }

}