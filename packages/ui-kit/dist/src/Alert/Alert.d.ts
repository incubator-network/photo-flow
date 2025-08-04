import { AlertData } from './AlertTypes'
export declare const Alert: ({
  message,
  type,
  onClose,
}: AlertData & {
  onClose: () => void
}) => import('react/jsx-runtime').JSX.Element
