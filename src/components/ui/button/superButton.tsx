// 'use client'

import React, {ReactNode} from 'react';

type PropsType = {
  variant: 'primary' | 'secondary' | 'outline' | 'text',
  children?: ReactNode,
  onClick?: () => void,
  disabled?: boolean,
  type?: 'button' | 'submit' | 'reset',
}
const variantStyles = {
  primary: `
               flex items-center justify-center 
               text-base text-[#FFFFFF]  font-[600]
               w-[182px] h-[36px] 
               bg-[#397DF6]               
               hover:bg-[#73A5FF] 
               focus:bg-[#2F68CC] 
               focus-visible:outline-1
               focus-visible:outline-[#2F68CC]
               active:bg-[#2F68CC] 
               disabled:bg-[#234E99]
               disabled:text-[#8D9094] 
               rounded-[2px]`,
  secondary: `
              flex items-center justify-center 
              text-[#FFFFFF]
              font-[600]
              text-base
              w-[182px] h-[36px]  
              bg-[#333333] 
               rounded-[2px]
              hover:bg-[#4C4C4C]
              focus-visible:bg-[##333333]
              focus-visible:outline-1
              focus-visible:outline-[#4C8DFF]
              active:bg-[#212121] 
              disabled:bg-[#171717] disabled:text-[#8D9094]`,
  outline: `
             flex items-center justify-center
             text-base w-[182px] h-[36px]
             text-[#397DF6]
             font-[600]
             border border-[#397DF6] rounded-[2px]
             hover:border-[#73A5FF]
             hover:text-[#73A5FF]
             focus:outline-[#2F68CC] focus:text-[#2F68CC]
             active:border-[#2F68CC] active:text-[#2F68CC]
             disabled:border-[#234E99] disabled:text-[#234E99]`,
  text: `
             flex items-center justify-center
             text-base w-[100px] h-[36px]
             text-[#397DF6]
             font-[600]
             border border-transparent rounded-[2px]
             hover:text-[#73A5FF]
             focus:outline-[#2F68CC] focus:text-[#2F68CC]
             active:text-[#2F68CC]
             disabled:text-[#234E99]`,
};


export const SuperButton = (props: PropsType) => {
  const {variant,children, onClick} = props;
  return (
    <button
      onClick={onClick}
      className={variantStyles[variant]}
      disabled={false}>
      {children}
    </button>
  );
};

