import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Pagination } from '@/components/pagination/Pagination'
import { action } from 'storybook/actions'
import { PaginationPropsType } from '@/components/pagination/Pagination'

const meta: Meta<PaginationPropsType> = {
  component: Pagination,
  argTypes: {
    currentPage: { control: { type: 'number' } },
    totalCount: { control: { type: 'number' } },
    itemsPerPage: { control: { type: 'number' } },
    onChangePagination: action('onChangePagination'),
  },
}

export default meta

type Story = StoryObj<PaginationPropsType>

export const Default: Story = {
  args: {
    currentPage: 5,
    itemsPerPage: 10,
    totalCount: 100,
  },
}
