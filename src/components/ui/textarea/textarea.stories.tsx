import { Textarea } from './Textarea'
import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fireEvent, userEvent, within } from 'storybook/test'

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 'Hi bro! Good day.',
    changeValue: () => {},
    textareaLabel: 'Edit comment',
  },
}

export const WithError: Story = {
  args: {
    value: 'Bad day.',
    changeValue: () => {},
    textareaLabel: 'Edit comment',
    error: 'Error here',
  },
}

export const Disabled: Story = {
  args: {
    value: 'Disabled.',
    changeValue: () => {},
    textareaLabel: 'Edit comment',
    disabled: true,
  },
}

export const Hover: Story = {
  args: {
    value: 'Hover as Default.',
    changeValue: () => {},
    textareaLabel: 'Edit comment',
  },
}

export const Focused: Story = {
  args: {
    value: 'In focused',
    changeValue: () => {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByRole('textbox')
    await userEvent.click(textarea)
  },
}

export const Active: Story = {
  args: {
    value: 'Press to active',
    changeValue: () => {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByRole('textbox')
    await fireEvent.mouseDown(textarea)
  },
}
