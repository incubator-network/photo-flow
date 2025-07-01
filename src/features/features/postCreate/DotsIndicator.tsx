import React from 'react'
type PropsType = {
  imageUrls: string[]
  activeIndex: number
  activeColor?: string
  inactiveColor?: string
  className?: string
}
export const DotsIndicator = (props: PropsType) => {
  const { imageUrls, activeIndex, activeColor, inactiveColor, className } =
    props
  return (
    <div
      className={`absolute bottom-[25px] left-1/2 z-2 flex -translate-1/2 ${className}`}
    >
      {imageUrls.map((_url, idx) => (
        <div
          key={idx}
          className={`${idx === activeIndex ? activeColor : inactiveColor} h-[8px] w-[8px] rounded-full`}
        ></div>
      ))}
    </div>
  )
}

// className={
//   `absolute bottom-[25px] left-1/2 z-2 flex -translate-1/2 gap-[6px]`
// }

// className={`${idx === activeIndex ? 'bg-accent-500' : 'bg-light-900'} h-[8px] w-[8px] rounded-full`}
