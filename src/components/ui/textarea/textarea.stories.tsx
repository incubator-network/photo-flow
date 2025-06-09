import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
    error: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    placeholder: 'Введите текст...',
    className: 'w-[300px]',
  },
}

export const WithLabel: Story = {
  args: {
    textareaLabel: 'Описание',
    placeholder: 'Введите описание...',
    className: 'w-[300px]',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Неактивное поле',
    className: 'w-[300px]',
  },
}

export const WithError: Story = {
  args: {
    textareaLabel: 'Email',
    placeholder: 'Введите email',
    error: 'Некорректный email',
    className: 'w-[300px]',
  },
}

export const Controlled: Story = {
  args: {
    value: 'Контролируемое значение',
    className: 'w-[300px]',
  },
  render: args => {
    return <Textarea {...args} />
  },
}

export const CustomSize: Story = {
  args: {
    rows: 5,
    cols: 40,
    placeholder: 'Большое текстовое поле',
    className: 'w-full',
  },
}
