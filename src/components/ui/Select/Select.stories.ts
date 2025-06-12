import { Meta } from '@storybook/nextjs-vite'
import { Select } from '@/components/ui/Select/Select'

const meta = {
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>
export default meta

export const Main = {
  args: {
    items: [
      {
        title: '1',
      },
      {
        title: 'test',
      },
      {
        title: '1231231213',
      },
      {
        title: 'test2',
      },
      {
        title: 'Select-box',
      },
    ],
    placeholder: 'Select-box',
    className: 'w-[210px]',
    contentClassName: 'w-[210px]',
  },
}

export const MainWithoutPlaceholder = {
  args: {
    items: [
      {
        title: '1',
      },
      {
        title: 'test',
      },
      {
        title: '1231231213',
      },
      {
        title: 'test2',
      },
      {
        title: 'Select-box',
      },
    ],
    className: 'w-[210px]',
    contentClassName: 'w-[210px]',
  },
}

export const MainDisabled = {
  args: {
    items: [
      {
        title: '1',
      },
      {
        title: 'test',
      },
      {
        title: '1231231213',
      },
      {
        title: 'test2',
      },
      {
        title: 'Select-box',
      },
    ],
    placeholder: 'Select-box',

    disabled: true,
    className: 'w-[210px]',
    contentClassName: 'w-[210px]',
  },
}

export const ClosedWithTitle = {
  args: {
    items: [
      {
        title: '1',
      },
      {
        title: 'test',
      },
      {
        title: '1231231213',
      },
      {
        title: 'test2',
      },
      {
        title: 'Select-box',
      },
    ],
    placeholder: 'Select-box',

    title: 'Select-box',
    className: 'w-[210px]',
    contentClassName: 'w-[210px]',
  },
}

export const MainWithIcon = {
  args: {
    items: [
      {
        title: 'Our employer',
        path: '/public/google.svg',
        description: 'Our employer',
      },
      {
        title: 'GB',
        path: '/public/Flag-United-Kingdom.svg',
        description: 'Flag United Kingdom',
      },
      {
        title: 'Russian',
        path: '/public/Flag-Russia.svg',
        description: 'Russian flag',
      },
    ],
    placeholder: 'Russian',

    className: 'w-[210px]',
    contentClassName: 'w-[210px]',
  },
}

export const MainWithIconWithoutPlaceholder = {
  args: {
    items: [
      {
        title: 'Our employer',
        path: '/public/google.svg',
        description: 'Our employer',
      },
      {
        title: 'GB',
        path: '/public/Flag-United-Kingdom.svg',
        description: 'Flag United Kingdom',
      },
      {
        title: 'Russian',
        path: '/public/Flag-Russia.svg',
        description: 'Russian flag',
      },
    ],

    className: 'w-[210px]',
    contentClassName: 'w-[210px]',
  },
}
