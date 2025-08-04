'use client'
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import * as RadixSelect from '@radix-ui/react-select'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'
import ArrowDown from '../icons/arrow-down.svg'
import Image from 'next/image'
export const Select = ({
  onOpenChange,
  placeholder,
  title,
  items,
  disabled,
  className,
  value,
  onValueChange,
  ...restProps
}) => {
  const [open, setOpen] = useState(false)
  const selectedItem = items.find(item => item.title === value)
  return _jsxs('div', {
    className: twMerge(`relative`, className),
    children: [
      title && _jsx('p', { className: 'text-regular-14 text-light-900', children: title }),
      _jsxs(RadixSelect.Root, {
        open: open,
        onValueChange: onValueChange,
        onOpenChange: () => {
          setOpen(!open)
          onOpenChange?.(open)
        },
        disabled: disabled,
        value: value,
        ...restProps,
        children: [
          _jsxs(RadixSelect.Trigger, {
            className: twMerge(
              `bg-dark-700 text-regular-16 border-dark-100 hover:text-light-900 focus:border-accent-500 data-[state=open]:bg-dark-500 data-[state=open]:border-light-100 inline-flex h-[36px] w-auto items-center justify-between gap-4 rounded-xs border px-3 py-[6px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] focus:border-2 focus:outline-none data-[state=open]:rounded-none`,
              disabled && `text-dark-100 border-dark-100 hover:text-dark-100`,
              title && 'text-light-900',
              !placeholder && 'inline-flex',
              className?.includes('w-') && 'w-full'
            ),
            children: [
              selectedItem?.path && placeholder
                ? _jsxs('div', {
                    className: 'flex items-center gap-3',
                    children: [
                      _jsx(RadixSelect.Icon, {
                        children: _jsx(Image, {
                          width: 20,
                          height: 20,
                          src: selectedItem.path,
                          alt: selectedItem.description || 'image of selected item',
                        }),
                      }),
                      _jsx('span', { children: selectedItem.title }),
                    ],
                  })
                : selectedItem?.path && !placeholder
                  ? _jsx('div', {
                      className: 'flex items-center gap-3',
                      children: _jsx(RadixSelect.Icon, {
                        children: _jsx(Image, {
                          width: 20,
                          height: 20,
                          src: selectedItem.path,
                          alt: selectedItem.description || 'image of selected item',
                        }),
                      }),
                    })
                  : _jsx(RadixSelect.Value, { placeholder: placeholder, className: 'block' }),
              _jsx(RadixSelect.Icon, {
                className: twMerge(
                  `block h-6 w-6 transition-transform duration-200`,
                  open && 'rotate-180',
                  !placeholder && 'ml-auto'
                ),
                children: _jsx(ArrowDown, { className: `fill-light-100 text-light-100 h-6 w-6` }),
              }),
            ],
          }),
          _jsx(RadixSelect.Portal, {
            children: _jsx(RadixSelect.Content, {
              className: twMerge(
                `data-[state=open]:hover:bg-accent-500 z-[101] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xs border shadow data-[state=open]:rounded-none`
              ),
              position: 'popper',
              align: 'start',
              avoidCollisions: true,
              children: _jsx(RadixSelect.Viewport, {
                children: items.map(item => {
                  return _jsx(
                    RadixSelect.Item,
                    {
                      value: item.title,
                      className: twMerge(
                        `text-light-100 bg-dark-500 hover:text-accent-500 hover:bg-dark-300 flex h-[36px] w-full items-center justify-between border-none px-3 py-[6px] outline-none`
                      ),
                      children: item.path
                        ? _jsxs('div', {
                            className: twMerge(
                              `flex items-center gap-3`,
                              !placeholder && `mx-auto`
                            ),
                            children: [
                              _jsx(RadixSelect.Icon, {
                                children: _jsx(Image, {
                                  width: 20,
                                  height: 20,
                                  src: item.path,
                                  alt: item.description || 'select icon',
                                }),
                              }),
                              placeholder && _jsx(RadixSelect.ItemText, { children: item.title }),
                            ],
                          })
                        : _jsx(RadixSelect.ItemText, { children: item.title }),
                    },
                    item.title
                  )
                }),
              }),
            }),
          }),
        ],
      }),
    ],
  })
}
