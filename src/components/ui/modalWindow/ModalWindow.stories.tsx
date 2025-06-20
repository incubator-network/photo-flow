import { ModalWindow } from './ModalWindow'

const meta = {
  title: 'Components/ModalWindow',
  component: ModalWindow,
  args: {
    onClose: () => {},
    open: true,
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

export const Default = {
  args: {
    modalTitle: 'Default Modal',
    children: <div className='p-6'>Modal content goes here</div>,
  },
}

export const WithoutTitle = {
  args: {
    children: <div className='p-6'>This children</div>,
  },
}

export const CustomSize = {
  args: {
    modalTitle: 'Custom Size',
    className: 'h-[300px] w-[500px]',
    children: <div className='p-6'>Large modal content</div>,
  },
}

export const WithCustomOverlay = {
  args: {
    modalTitle: 'Custom Overlay',
    overlayClassName: 'bg-blue-900/30 backdrop-blur-md',
    children: <div className='p-6'>Modal with custom overlay</div>,
  },
}

export const InitiallyClosed = {
  args: {
    open: false,
    modalTitle: 'Closed Modal',
    children: <div className='p-6'>This modal is initially closed</div>,
  },
}
