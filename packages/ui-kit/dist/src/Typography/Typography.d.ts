import { HTMLAttributes } from 'react';
type PropsType = {
    variant?: 'large' | 'h1' | 'h2' | 'h3' | 'regular_text_16' | 'bold_text_16' | 'regular_text_14' | 'medium_text_14' | 'bold_text_14' | 'small_text' | 'semi_bold_small_text' | 'regular_link' | 'small_link';
    asChild?: boolean;
} & HTMLAttributes<HTMLElement>;
export declare const Typography: ({ variant, className, asChild, children, ...props }: PropsType) => import("react/jsx-runtime").JSX.Element;
export {};
