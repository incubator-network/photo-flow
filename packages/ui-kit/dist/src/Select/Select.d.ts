import { ComponentProps } from 'react';
type Item = {
    title: string;
    path?: string;
    description?: string;
};
type PropsType<T extends string> = {
    onOpenChange?: (open: boolean) => void;
    placeholder?: string;
    title?: string;
    items: Item[];
    disabled?: boolean;
    value?: T;
    onValueChange?: (value: T) => void;
} & Omit<ComponentProps<'select'>, 'value' | 'defaultValue' | 'onChange' | 'dir'>;
export declare const Select: <T extends string>({ onOpenChange, placeholder, title, items, disabled, className, value, onValueChange, ...restProps }: PropsType<T>) => import("react/jsx-runtime").JSX.Element;
export {};
