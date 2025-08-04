type PropsMenu<T> = {
  content?: PropsMenuItems
  isAuth: boolean
  meData: T
  getProfileId: (data: T) => string
  logoutHandler: () => void
  isModalOpen: boolean
  setIsModalOpen: (v: boolean) => void
}
export type PropsMenuItems = {
  title: string
  url: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}
export declare const Sidebar: <T>({
  content,
  isAuth,
  meData,
  getProfileId,
  logoutHandler,
  isModalOpen,
  setIsModalOpen,
}: PropsMenu<T>) => import('react/jsx-runtime').JSX.Element | null
export {}
