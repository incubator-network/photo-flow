import ReCAPTCHA from 'react-google-recaptcha';
import { RefObject } from 'react';
type RecaptchaProps = {
    theme?: 'dark' | 'light';
    size?: 'normal' | 'compact' | 'invisible';
    lang?: 'en' | 'ru';
    className?: string;
    error: boolean;
    recaptchaRef: RefObject<ReCAPTCHA | null>;
    handleCaptchaAction: (token: string | null) => void;
};
export declare const Recaptcha: ({ lang, size, theme, className, error, recaptchaRef, handleCaptchaAction, }: RecaptchaProps) => import("react/jsx-runtime").JSX.Element;
export {};
