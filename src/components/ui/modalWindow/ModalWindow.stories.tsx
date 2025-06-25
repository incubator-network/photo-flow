import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ModalWindow } from './ModalWindow'
import { fn } from 'storybook/test'

const meta = {
  title: 'Components/ModalWindow',
  component: ModalWindow,
  args: {
    onClose: fn(),
    open: true,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ModalWindow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modalTitle: 'Default Modal',
    children: <div className='p-6'>Modal content goes here</div>,
  },
}

export const WithoutTitle: Story = {
  args: {
    children: <div className='p-6'>This children</div>,
  },
}

export const CustomSize: Story = {
  args: {
    modalTitle: 'Custom Size',
    className: 'h-[300px] w-[500px]',
    children: <div className='p-6'>Large modal content</div>,
  },
}

export const WithCustomOverlay: Story = {
  args: {
    modalTitle: 'Custom Overlay',
    overlayClassName: 'bg-blue-900/30 backdrop-blur-md',
    children: <div className='p-6'>Modal with custom overlay</div>,
  },
}

export const InitiallyClosed: Story = {
  args: {
    open: false,
    modalTitle: 'Closed Modal',
    children: <div className='p-6'>This modal is initially closed</div>,
  },
}
