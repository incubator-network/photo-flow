import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime'
import * as Dialog from '@radix-ui/react-dialog'
import { twMerge } from 'tailwind-merge'
import ClosePicture from '@/assets/icons/close.svg'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
export const ModalWindow = ({
  hiddenCloseButton,
  onClose,
  modalTitle,
  children,
  open,
  className = 'h-[228px] w-[378px]',
  overlayClassName,
  ...props
}) => {
  return _jsx(Dialog.Root, {
    open: open,
    onOpenChange: onClose,
    ...props,
    children: _jsxs(Dialog.Portal, {
      children: [
        _jsx(Dialog.Overlay, {
          className: twMerge('fixed inset-0 z-102 bg-black/60', overlayClassName),
        }),
        _jsxs(Dialog.Content, {
          onOpenAutoFocus: e => e.preventDefault(),
          className: twMerge(
            'bg-dark-300 border-dark-100 fixed top-1/2 left-1/2 z-102 -translate-x-1/2 -translate-y-1/2 rounded-[1px] border',
            className
          ),
          children: [
            modalTitle
              ? _jsxs(Dialog.Title, {
                  className:
                    'border-b-dark-100 col-span-2 row-span-1 flex h-[60px] items-center justify-between border-b px-[24px] text-xl font-bold',
                  children: [
                    modalTitle,
                    _jsx(Dialog.Close, {
                      asChild: true,
                      className: '',
                      children: _jsx('button', {
                        className: `h-[24px] w-[24px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-700 ${hiddenCloseButton ? 'hidden' : ''}`,
                        'aria-label': 'Close',
                        children: _jsx(ClosePicture, {
                          className: 'm-auto h-[24px] w-[24px] fill-white',
                        }),
                      }),
                    }),
                  ],
                })
              : _jsxs(_Fragment, {
                  children: [
                    _jsx(VisuallyHidden, { children: _jsx(Dialog.Title, { children: 'Dialog' }) }),
                    _jsx(Dialog.Close, {
                      asChild: true,
                      className: 'absolute top-[-42px] right-[-36px]',
                      children: _jsx('button', {
                        className:
                          'mt-3 h-[24px] w-[24px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-700',
                        'aria-label': 'Close',
                        children: _jsx(ClosePicture, {
                          className: 'm-auto h-[24px] w-[24px] fill-white',
                        }),
                      }),
                    }),
                  ],
                }),
            children,
          ],
        }),
      ],
    }),
  })
}
