import { Textarea, TextareaProps } from './Textarea'

const meta = {
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

export const Default = {
  args: {
    placeholder: 'Введите текст...',
    className: 'w-[300px]',
  },
}

export const WithLabel = {
  args: {
    textareaLabel: 'Описание',
    placeholder: 'Введите описание...',
    className: 'w-[300px]',
  },
}

export const Disabled = {
  args: {
    disabled: true,
    placeholder: 'Неактивное поле',
    className: 'w-[300px]',
  },
}

export const WithError = {
  args: {
    textareaLabel: 'Email',
    placeholder: 'Введите email',
    error: 'Некорректный email',
    className: 'w-[300px]',
  },
}

export const Controlled = {
  args: {
    value: 'Контролируемое значение',
    className: 'w-[300px]',
  },
  render: (args: TextareaProps) => {
    return <Textarea {...args} />
  },
}

export const CustomSize = {
  args: {
    rows: 5,
    cols: 40,
    placeholder: 'Большое текстовое поле',
    className: 'w-full',
  },
}
