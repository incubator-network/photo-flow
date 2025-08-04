import { ComponentPropsWithoutRef } from 'react';
type Props = {
    hiddenCloseButton?: boolean;
    open: boolean;
    modalTitle?: string;
    onClose: () => void;
    className?: string;
    overlayClassName?: string;
} & ComponentPropsWithoutRef<'div'>;
export declare const ModalWindow: ({ hiddenCloseButton, onClose, modalTitle, children, open, className, overlayClassName, ...props }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
