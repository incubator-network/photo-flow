type PropsType<T> = {
  images: T[] | string[]
  data: 'uiData' | 'serverData'
  classname?: string
  getId: (image: T) => string
  getUrl: (image: T) => string
}
export declare const Slider: <T>({
  images,
  data,
  classname,
  getId,
  getUrl,
}: PropsType<T>) => import('react/jsx-runtime').JSX.Element
export {}
