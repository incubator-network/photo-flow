import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Radio } from './RadioGroup'

const meta = {
  component: Radio,
} satisfies Meta<typeof Radio>
export default meta

type Story = StoryObj<typeof meta>

export const Main: Story = {
  args: {
    items: [
      { title: 'RadioGroup3', id: '123' },
      { title: 'RadioGroup1', id: '1231' },
      { title: 'RadioGroup', id: '12333' },
    ],
    value: 'example',
    onValueChange: () => {},
  },
}

export const Disabled: Story = {
  args: {
    items: [
      { title: 'RadioGroup3', id: '123' },
      { title: 'RadioGroup1', id: '1231' },
      { title: 'RadioGroup', id: '12333' },
    ],
    value: 'example',
    onValueChange: () => {},
    disabled: true,
  },
}
