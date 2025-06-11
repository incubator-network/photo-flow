import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  open: boolean
  modalTitle?: string
  onClose: () => void
  className?: string
  overlayClassName?: string
} & ComponentPropsWithoutRef<'div'>

export const ModalWindow = ({
  onClose,
  modalTitle,
  children,
  open,
  className = 'h-[228px] w-[378px]',
  overlayClassName,
  ...props
}: Props) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose} {...props}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={twMerge('fixed inset-0 bg-black/60', overlayClassName)}
        />
        <Dialog.Content
          className={twMerge(
            'bg-dark-300 border-dark-100 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[1px] border',
            className
          )}
        >
          {modalTitle ? (
            <Dialog.Title
              className={
                'border-b-dark-100 flex h-[59px] items-center justify-between border-b px-[24px] text-xl font-bold'
              }
            >
              {modalTitle}
              <Dialog.Close asChild className={''}>
                <button
                  className={
                    'h-[24px] w-[24px] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-700'
                  }
                  aria-label='Close'
                >
                  <Cross2Icon className={'h-[24px] w-[24px]'} />
                </button>
              </Dialog.Close>
            </Dialog.Title>
          ) : (
            <Dialog.Close
              asChild
              className={'absolute top-[-42px] right-[-36px]'}
            >
              <button
                className={
                  'h-[24px] w-[24px] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-700'
                }
                aria-label='Close'
              >
                <Cross2Icon className={'h-[24px] w-[24px]'} />
              </button>
            </Dialog.Close>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
