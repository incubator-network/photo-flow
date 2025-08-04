import { jsx as _jsx } from "react/jsx-runtime";
import { Slot } from '@radix-ui/react-slot';
import { twMerge } from 'tailwind-merge';
const defaultTags = {
    large: 'div',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    regular_text_16: 'p',
    bold_text_16: 'p',
    regular_text_14: 'p',
    medium_text_14: 'p',
    bold_text_14: 'span',
    small_text: 'span',
    semi_bold_small_text: 'span',
    regular_link: 'span',
    small_link: 'span',
};
const variantClasses = {
    large: 'text-[26px] leading-large font-semibold',
    h1: 'text-[20px] leading-large font-bold',
    h2: 'text-[18px] leading-medium font-bold',
    h3: 'text-[16px] leading-medium font-semibold',
    regular_text_16: 'text-[16px] leading-medium font-normal',
    bold_text_16: 'text-[16px] leading-medium font-bold',
    regular_text_14: 'text-[14px] leading-medium font-normal',
    medium_text_14: 'text-[14px] leading-medium font-medium',
    bold_text_14: 'text-[14px] leading-medium font-bold',
    small_text: 'text-[12px] leading-small font-normal',
    semi_bold_small_text: 'text-[12px] leading-small font-semibold',
    regular_link: 'text-[14px] leading-medium font-normal text-accent-500 underline cursor-pointer',
    small_link: 'text-[12px] leading-small font-normal text-accent-500 underline cursor-pointer',
};
export const Typography = ({ variant = 'regular_text_16', className, asChild, children, ...props }) => {
    const Component = asChild ? Slot : defaultTags[variant];
    return (_jsx(Component, { className: twMerge(variantClasses[variant], className), ...props, children: children }));
};
