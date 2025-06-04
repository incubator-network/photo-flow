import { Meta } from '@storybook/nextjs-vite'
import { SuperCard } from '@/components/ui/superCard/SuperCard'

const meta = {
  component: SuperCard,
} satisfies Meta<typeof SuperCard>
export default meta

export const Card = {
  args: {
    maxWidth: '300',
    height: '300',
  },
}
